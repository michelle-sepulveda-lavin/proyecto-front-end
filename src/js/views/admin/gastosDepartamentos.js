import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/pagination';
import PagoGastos from '../../components/pagoGasto';
import PagoUsuario from '../../components/pagoUsuario';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const GastosDepartamentos = () => {

    const { store, actions } = useContext(Context)



    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const estados = ["No Pagado", "Moroso", "Por Revisar", "Pagado"];
    const [gastoSeleccionado, setGastoSeleccionado] = useState("");
    const [estadoPago, setEstadoPago] = useState("todos")
    const handleInputGastos = (e) => {
        let value = e.target.value;
        let split = value.split(",")
        const month = parseInt(split[0])
        const year = parseInt(split[1])
        setGastoSeleccionado({
            month: month,
            year: year
        })
    };
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    const [show, setShow] = useState(false)
    const [dataPago, setDataPago] = useState({
        idDepto: null,
        month: null,
        year: null,
        pago: null
    })
    const [data, setData] = useState([])
    const currentPosts = data.length > 0 ? data.slice(indexOfFirstPost, indexOfLastPost) : []

    useEffect(() => {
        actions.getMontosTotales()
        actions.getEdificioCompleto()
        actions.getEstacionamientosDelEdificio()
    }, []);

    useEffect(() => {
        let _isMounted = true

        const getGastosMonthYear = async (month, year) => {
            const resp = await fetch(`${store.apiURL}/gastoscomunes/edificio/${store.currentEdificioID}/${month}/${year}`)
            const data = await resp.json()
            const { msg } = data;
            if (_isMounted) {
                setData(data)
            }
        }

        getGastosMonthYear(gastoSeleccionado.month, gastoSeleccionado.year)
        actions.getGastosMonthYear(gastoSeleccionado.month, gastoSeleccionado.year)
        return () => _isMounted = false
    }, [gastoSeleccionado]);


    const [showPago, setShowPago] = useState(false)
    const [comprobantePago, setComprobantePago] = useState(null)
    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos comunes por mes</h1>
            <div className="container pb-4">
                <div className="d-flex justify-content-center mt-5">
                    <div className="form-inline">
                        <div className="d-flex align-items-center mr-3">
                            <p className="m-0">Busca por fecha: </p>
                        </div>
                        <select className=" form-control mr-3" defaultValue={'default'} id="turno" onChange={(e) => {
                            handleInputGastos(e)
                            setEstadoPago("todos")
                            setCurrentPage(1)

                        }}>
                            <option>Seleccionar</option>
                            {store.montosTotalesMes.length > 0 ?
                                store.montosTotalesMes.map((monto) => {
                                    return <option value={[monto.month, monto.year]}>{meses[monto.month]} - {monto.year}</option>
                                })
                                :
                                <option disabled>No hay gastos cargados al sistema</option>
                            }

                        </select>
                        <div>

                        </div>
                    </div>
                </div>

                <div className="container min-height-50">
                    <div>
                        <div className="row mx-auto mt-4">
                            <div className="col-12 col-md-10 mx-auto overflow-auto pb-4">
                                {store.gastosMes.length > 0 &&
                                    <>
                                        <div className="d-flex justify-content-center mb-4">
                                            <span className="boton-hover btn border-info  mr-2 rounded-pill border shadow-sm" onClick={() => {
                                                setEstadoPago("pagado")
                                            }}>Pagados</span>
                                            <span className="boton-hover btn border-info  mr-2 rounded-pill border shadow-sm" onClick={() => {
                                                setEstadoPago("revision")
                                            }}>Por Revisar</span>
                                            <span className="btn boton-hover border-info  rounded-pill border shadow-sm mr-2" onClick={() => {
                                                setEstadoPago("noPagado")
                                            }}>No pagados</span>
                                            <span className="btn boton-hover border  rounded border shadow-sm" onClick={() => {
                                                setEstadoPago("todos")
                                            }}>Todos</span>
                                        </div>

                                        < table className="table text-center overflow-auto mx-auto ">
                                            <thead className="thead-dark text-center mx-auto">
                                                <tr className="mx-auto">
                                                    <th scope="col">Depto</th>
                                                    <th scope="col">Monto</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Promedio por Depto</th>

                                                    <th scope="col">{estadoPago === "pagado" ? "Comprobante" : estadoPago === "noPagado" ? "Cambiar Estado" : estadoPago === "revision" ? "Comprobante" : ""}</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map((gasto, index) => {

                                                    if (gasto.estado === estadoPago || estadoPago === "todos") {
                                                        return (

                                                            <tr key={index}>
                                                                <th scope="row">{gasto.departamento.numero_depto}</th>
                                                                <td>{
                                                                    new Intl.NumberFormat('en-US',
                                                                        { style: 'currency', currency: 'CLP' }
                                                                    ).format(gasto.monto)}</td>
                                                                <td>{gasto.estado === "noPagado" ? estados[0] : gasto.estado === "moroso" ? estados[1] : gasto.estado === "revision" ? estados[2] : gasto.estado === "pagado" ? estados[3] : ""}</td>
                                                                <td>{estadoPago === "revision" && <span className="btn btn-warning"
                                                                    onClick={() => {
                                                                        actions.cambiarEstadoGastoComun(gasto.departamento.departamento_id, gasto.month, gasto.year, "pagado")
                                                                    }}>Cambiar Estado</span>} </td>


                                                                {estadoPago === "todos" ?

                                                                    (gasto.estado === "pagado" ?
                                                                        <td>
                                                                            <span className="btn btn-success px-4"
                                                                                onClick={() => {
                                                                                    setShowPago(true)
                                                                                    setComprobantePago(gasto.pago)
                                                                                }
                                                                                }>Comprobante</span> </td>
                                                                        :
                                                                        gasto.estado === "revision" ?
                                                                            <td> <span className="btn btn-warning"
                                                                                onClick={() => {

                                                                                    setShow(true)
                                                                                    setDataPago({
                                                                                        idDepto: gasto.departamento.departamento_id,
                                                                                        month: gasto.month,
                                                                                        year: gasto.year,
                                                                                        pago: gasto.pago
                                                                                    })

                                                                                }}>Validar</span> </td>
                                                                            :
                                                                            gasto.estado === "noPagado" ?
                                                                                <td> <span className="btn btn-info"
                                                                                    onClick={() => {
                                                                                        console.log("EN PROGRESO")
                                                                                    }}>Enviar notificación</span> </td>
                                                                                :
                                                                                "")

                                                                    :

                                                                    (estadoPago === "pagado" ?
                                                                        <td>
                                                                            <span className="btn btn-success"
                                                                            >Comprobante</span> </td>
                                                                        :
                                                                        estadoPago === "noPagado" ?
                                                                            <td> <span className="btn btn-info"
                                                                                onClick={() => {
                                                                                    console.log("EN PROGRESO")
                                                                                }}>Enviar notificación</span>  </td>
                                                                            :
                                                                            estadoPago === "revision" ?
                                                                                <td> <span className="btn btn-warning"
                                                                                    onClick={() => {
                                                                                        setShow(true)
                                                                                        setDataPago({
                                                                                            idDepto: gasto.departamento.departamento_id,
                                                                                            month: gasto.month,
                                                                                            year: gasto.year,
                                                                                            pago: gasto.pago
                                                                                        })
                                                                                    }}>Validar</span> </td>
                                                                                :
                                                                                "")
                                                                }

                                                            </tr>
                                                        )
                                                    }

                                                })
                                                }
                                            </tbody>

                                        </table>
                                        <Pagination postsPerPage={perPage} totalPosts={data.length} paginate={paginate} />
                                    </>
                                }
                                {store.montosTotalesMes.length === 0 &&

                                    <h4>No hay montos ingresados en este edificio</h4>

                                }


                            </div>



                        </div>



                    </div>




                </div>
                <Link to="/admin/gastos-comunes" style={{ textDecoration: 'none' }}>
                    <span className="boton-a-inicio  shadow">
                        <i className="fas fa-arrow-circle-left"></i> Ir atras
                    </span>
                </Link>
            </div>
            <PagoUsuario pago={comprobantePago} show={showPago} setShow={setShowPago}></PagoUsuario>

            <PagoGastos show={show} setShow={setShow} datos={dataPago} ></PagoGastos>
        </SidebarPage>
    )
};

export default GastosDepartamentos;