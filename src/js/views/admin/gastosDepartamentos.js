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
    const currentPosts = data.length > 0 && data.slice(indexOfFirstPost, indexOfLastPost)

    const [data2, setData2] = useState([])

    useEffect(() => {
        actions.getMontosTotales()

    }, []);

    const [showPago, setShowPago] = useState(false)
    const [comprobantePago, setComprobantePago] = useState(null)

    const filtradoEstado = (estado) => {

        if (estado === "todos") {
            const gastos = data2.filter((gasto) => {
                return (gasto.estado === "pagado" || gasto.estado === "noPagado" || gasto.estado === "revision")
            })
            setData(gastos)
            setCurrentPage(1)
        } else if (estado === "pagado") {
            const gastoPagado = data2.filter((gasto) => {
                return (gasto.estado === "pagado")
            })
            setCurrentPage(1)
            setData(gastoPagado.length > 0 && gastoPagado)

        } else if (estado === "revision") {
            const gastoRevision = data2.filter((gasto) => {
                return (gasto.estado === "revision")
            })
            setCurrentPage(1)
            setData(gastoRevision.length > 0 && gastoRevision)

        } else if (estado === "noPagado") {
            const gastoPagado = data2.filter((gasto) => {
                return (gasto.estado === "noPagado")
            })
            setCurrentPage(1)
            setData(gastoPagado.length > 0 && gastoPagado)

        }
    }


    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos comunes por mes</h1>
            <div className="container pb-4">
                <div className="d-flex justify-content-center mt-5">
                    <div className="form-inline">
                        <div className="d-flex align-items-center mr-3">
                            <p className="m-0">Busca por fecha: </p>
                        </div>
                        <select className=" form-control mr-3" defaultValue={'default'} id="turno" onChange={handleInputGastos}>
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
                            <button className="btn btn-verde" onClick={() => {
                                if (gastoSeleccionado !== "") {
                                    actions.getGastosMonthYear(gastoSeleccionado.month, gastoSeleccionado.year, setData)
                                    setEstadoPago("todos")
                                    setCurrentPage(1)
                                    actions.getGastosMonthYear(gastoSeleccionado.month, gastoSeleccionado.year, setData).then(response => { setData2(response) })
                                    /* console.log("prueba") */
                                }
                            }}>Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="container min-height-50">
                    <div>
                        <div className="row mx-auto mt-4">
                            <div className="col-12 col-md-10 mx-auto overflow-auto pb-4">
                                {data2.length > 0 &&
                                    <>
                                        <div className="d-flex justify-content-center mb-4">
                                            <span className="boton-hover btn border-verde  mr-2 rounded shadow-sm" onClick={() => {
                                                setCurrentPage(1)
                                                setEstadoPago("pagado")

                                                filtradoEstado("pagado")

                                            }}>Pagados</span>
                                            <span className="boton-hover btn border-warning  mr-2 rounded border shadow-sm" onClick={() => {
                                                setCurrentPage(1)
                                                setEstadoPago("revision")

                                                filtradoEstado("revision")

                                            }}>Por Revisar</span>
                                            <span className="btn boton-hover border-info  rounded border shadow-sm mr-2" onClick={() => {
                                                setCurrentPage(1)
                                                setEstadoPago("noPagado")

                                                filtradoEstado("noPagado")


                                            }}>No pagados</span>
                                            <span className="btn boton-hover border  rounded  shadow-sm" onClick={() => {
                                                setCurrentPage(1)
                                                setEstadoPago("todos")

                                                filtradoEstado("todos")

                                            }}>Todos</span>
                                        </div>

                                        < table className="table text-center  table-bordered border overflow-auto mx-auto ">
                                            <thead className="btn-oscuro text-center mx-auto">
                                                <tr className="mx-auto">
                                                    <th scope="col">Depto</th>
                                                    <th scope="col">Monto</th>
                                                    <th scope="col">Estado</th>


                                                    <th scope="col">{estadoPago === "pagado" ? "Comprobante" : estadoPago === "noPagado" ? "Cambiar Estado" : estadoPago === "revision" ? "Comprobante" : ""}</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.length > 0 && currentPosts.map((gasto, index) => {

                                                    return (

                                                        <tr key={index}>
                                                            <th scope="row">{gasto.departamento.numero_depto}</th>
                                                            <td>{
                                                                new Intl.NumberFormat('en-US',
                                                                    { style: 'currency', currency: 'CLP' }
                                                                ).format(gasto.monto)}</td>
                                                            <td>{gasto.estado === "noPagado" ? estados[0] : gasto.estado === "moroso" ? estados[1] : gasto.estado === "revision" ? estados[2] : gasto.estado === "pagado" ? estados[3] : ""}</td>



                                                            {estadoPago === "todos" ?

                                                                (gasto.estado === "pagado" ?
                                                                    <td>
                                                                        <span className="btn btn-verde px-4"
                                                                            onClick={() => {
                                                                                setShowPago(true)
                                                                                setComprobantePago(gasto.pago)
                                                                            }
                                                                            }>Comprobante</span> </td>
                                                                    :
                                                                    gasto.estado === "revision" ?
                                                                        <td> <span className="btn btn-amarillo"
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
                                                                            <td> <span className="btn btn-azul"
                                                                                onClick={() => {
                                                                                    actions.correoGastos(gasto.departamento.residente, gasto.monto, gasto.departamento.propietario)
                                                                                }}>Enviar notificación</span> </td>
                                                                            :
                                                                            "")

                                                                :

                                                                (estadoPago === "pagado" ?
                                                                    <td>
                                                                        <span className="btn btn-verde"
                                                                            onClick={() => {
                                                                                setComprobantePago(gasto.pago)

                                                                                setShowPago(true)
                                                                            }}>Comprobante</span> </td>
                                                                    :
                                                                    estadoPago === "noPagado" ?
                                                                        <td> <span className="btn btn-azul"
                                                                            onClick={() => {
                                                                                actions.correoGastos(gasto.departamento.residente, gasto.monto)
                                                                            }}>Enviar notificación</span>  </td>
                                                                        :
                                                                        estadoPago === "revision" ?
                                                                            <td> <span className="btn btn-amarillo"
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

            <PagoGastos show={show} setShow={setShow} datos={dataPago} setData={setData} setData2={setData2} mes={gastoSeleccionado}></PagoGastos>
        </SidebarPage >
    )
};

export default GastosDepartamentos;