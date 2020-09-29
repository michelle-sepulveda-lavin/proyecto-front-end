import React, { useContext, useEffect, useRef, useState } from 'react';
import Pagination from '../../components/pagination';
import PagoUsuario from '../../components/pagoUsuario';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const GastosUser = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {
        actions.getDepartamentoActualUsuario()
        actions.getCurrentDate()
        getGastosDeptoActual()

    },[])

    const deptoID = !!store.departamentoActualUsuario && store.departamentoActualUsuario.id

    const ref = useRef(null)

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const estados = ["No Pagado", "Moroso", "En Revisión", "Pagado"];

    const [gastosDepto, setGastosDepto] = useState([])
    const mesActual = !!store.currentDate && store.currentDate.toLocaleString('default', { month: 'long' })

    const gastoCLP = (numero) => {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'CLP' }
        ).format(numero)
    }

    const [gastoActual, setGastoActual] = useState(null)

    const getGastosDeptoActual = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userID = JSON.parse(localStorage.getItem("departamento"))
        const edificioID = user.user.edificio.id
        const resp = await fetch(`${store.apiURL}/gastoscomunes/depto/${edificioID}/${userID}`)
        const data = await resp.json()
        setGastosDepto(data)
        console.log(data)
        setGastoActual(data.filter((meses) => {
            const q = new Date()
            const mes = q.getMonth();
            const year = q.getFullYear();
            return meses.month === mes && meses.year === year && (meses.estado === "noPagado" || meses.estado === "revision")
        }))
    }
    const [comprobantePago, setComprobantePago] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = !!gastosDepto && gastosDepto.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleAvatar = (e) => {
        const file = e.target.files[0]
        setComprobantePago(file)
        console.log(file)
    }

    const [show, setShow] = useState(false)
    const [pago, setPago] = useState(null)

    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos Comunes Usuario</h1>
            <div className="container">
                <div className="row justify-content-center mt-4">
                    <div className="col-12 col-md-10 row">

                        <div className="col-12 col-md-7">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title text-center mb-3">Gastos comunes de {mesActual}</h4>
                                    <div className="row justify-content-center">
                                        <div className="border col-md-5 mr-md-2 text-center">
                                            <p>Edificio</p>
                                            <p>{!!store.departamentoActualUsuario && store.departamentoActualUsuario.edificio.name}</p>
                                        </div>
                                        <div className="border mt-2 text-center col-md-5 mt-md-0">
                                            <p>Monto</p>
                                            {!!gastoActual && gastoActual.length > 0 ? (gastoActual[0].estado === "revision" ? <p className="">El pago está pendiente de revisión</p> : gastoActual[0].estado === "noPagado" ? <p> {gastoCLP(gastoActual[0].monto)}</p> : "") : <p>No hay gastos pendientes este mes</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-5">
                            <div class="card pb-3">
                                <div class="card-body">

                                    {!!gastoActual && gastoActual.length > 0 ? gastoActual[0].estado === "revision" ? <h3 className="mt-3 text-center">El pago está pendiente de revisión</h3> : gastoActual[0].estado === "noPagado" ?


                                        <>
                                            <h4 class="card-title text-center mb-3">Subir comprobante</h4>
                                            <div className="d-flex justify-center form-control-file">
                                                <input type="file" accept=".pdf" class="" ref={ref} onChange={handleAvatar} />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-success mt-4" onClick={() => {
                                                    if (comprobantePago !== "") {
                                                        actions.enviarComprobantePago(deptoID, gastoActual[0].month, gastoActual[0].year, comprobantePago)
                                                        getGastosDeptoActual()
                                                        setTimeout(() => {
                                                            ref.current.value = ""
                                                            window.location.reload()
                                                        }, 1500);
                                                    } else {
                                                        alert("Debe subir la imagen del comprobante")
                                                    }
                                                }}> Subir comprobante</button>
                                            </div>
                                        </>
                                        : ""

                                        :


                                        <p className="mt-3 text-center"> El pago de este mes ya fue aprobado</p>




                                    }
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="col-12 col-md-9 mx-auto overflow-auto pb-4 mt-4">
                        <h3 className="text-center mb-3" onClick={() => console.log(currentPosts)}>Historial</h3>
                        {!!gastosDepto && gastosDepto.length > 0 &&
                            <>
                                < table className="table text-center table-hover table-bordered border overflow-auto mx-auto ">
                                    <thead className="thead-dark text-center mx-auto">
                                        <tr className="mx-auto">
                                            <th scope="col">Año</th>
                                            <th scope="col">Mes</th>
                                            <th scope="col">Monto Total</th>
                                            <th scope="col">Estado</th>

                                            <th scope="col">Comprobante</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!!currentPosts && currentPosts.map((monto, index) => {


                                            return (

                                                <tr key={index}>
                                                    <th scope="row">{monto.year}</th>
                                                    <td>{meses[monto.month]}</td>
                                                    <td>{monto.estado === "noPagado" ? estados[0] : monto.estado === "moroso" ? estados[1] : monto.estado === "revision" ? estados[2] : monto.estado === "pagado" ? estados[3] : ""}</td>
                                                    <td>{new Intl.NumberFormat('en-US',
                                                        { style: 'currency', currency: 'CLP' }
                                                    ).format(monto.monto)}</td>


                                                    <td>
                                                        {(monto.estado === "pagado" || monto.estado === "revision") &&
                                                            <span className="btn btn-success" onClick={() => {
                                                                setShow(true)
                                                                setPago(monto.pago)
                                                            }}>Comprobante</span>}

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                                <Pagination postsPerPage={perPage} totalPosts={gastosDepto.length} paginate={paginate} />
                            </>
                        }
                    </div>


                </div>


            </div>
            <PagoUsuario pago={pago} show={show} setShow={setShow}></PagoUsuario>
        </SidebarPage>
    )
};

export default GastosUser;