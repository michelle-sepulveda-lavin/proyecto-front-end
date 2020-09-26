import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalComprobante from '../../components/modalComprobante';
import Pagination from '../../components/pagination';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const GastosAdmin = () => {
    const { store, actions } = useContext(Context)
    const [show, setShow] = useState(false)
    const [comprobanteName, setComprobanteName] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)

    const indexOfLastPost = currentPage * perPage;
    const indexOfFirstPost = indexOfLastPost - perPage;
    const currentPosts = store.montosTotalesMes.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getMontosTotales()
        actions.getEstacionamientosDelEdificio()

    }, [])
    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos Comunes</h1>
            <div className="container">


                <div className="container mt-4 ">
                    {store.montosTotalesMes.length > 0 &&
                        <div className="d-flex justify-content-center">
                            <Link to="/admin/gastos-departamentos"> <button className="btn btn-success mr-3">Buscar  gastos por mes</button> </Link>
                            <Link to="/admin/gastos-depto-actual"> <button className="btn btn-success">Buscar gastos por departamento</button> </Link>
                        </div>
                    }

                    <div className="row mx-auto mt-4">
                        <div className="col-12 col-md-9 mx-auto overflow-auto pb-4">
                            {store.montosTotalesMes.length > 0 &&
                                <>
                                    < table className="table text-center overflow-auto mx-auto ">
                                        <thead className="thead-dark text-center mx-auto">
                                            <tr className="mx-auto">
                                                <th scope="col">Año</th>
                                                <th scope="col">Mes</th>
                                                <th scope="col">Monto Total</th>
                                                <th scope="col">Promedio por Depto</th>

                                                <th scope="col">Comprobante</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPosts.map((monto, index) => {


                                                return (

                                                    <tr key={index}>
                                                        <th scope="row">{monto.year}</th>
                                                        <td>{meses[monto.month]}</td>
                                                        <td>{new Intl.NumberFormat('en-US',
                                                            { style: 'currency', currency: 'CLP' }
                                                        ).format(monto.monto)}</td>
                                                        <td>{
                                                            new Intl.NumberFormat('en-US',
                                                                { style: 'currency', currency: 'CLP' }
                                                            ).format(monto.monto / parseFloat(!!store.edificioCompleto && store.edificioCompleto.numero_departamentos))
                                                        }</td>

                                                        <td>

                                                            <span className="btn btn-warning" onClick
                                                                ={() => {
                                                                    setShow(true)
                                                                    setComprobanteName(monto.comprobante)
                                                                }}>Detalle</span></td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination postsPerPage={perPage} totalPosts={store.montosTotalesMes.length} paginate={paginate} />
                                </>
                            }
                            {store.montosTotalesMes.length === 0 &&

                                <h4>No hay montos ingresados en este edificio</h4>


                            }


                            <Link to="/admin/subir-gastos"> <button className="btn btn-success">Subir Gastos del Mes</button> </Link>
                        </div>



                    </div>




                </div>


                <ModalComprobante comprobante={comprobanteName} show={show} setShow={setShow}></ModalComprobante>


            </div >
        </SidebarPage >
    )
};

export default GastosAdmin;