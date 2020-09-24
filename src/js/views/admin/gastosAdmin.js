import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalComprobante from '../../components/modalComprobante';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const GastosAdmin = () => {
    const { store } = useContext(Context)
    const [show, setShow] = useState(false)
    const [comprobanteName, setComprobanteName] = useState("")
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos Comunes</h1>
            <div className="container">


                <div className="container mt-4 ">
                    {store.montosTotalesMes.length > 0 &&
                        <>
                            <Link to="/admin/gastos-departamentos"> <button className="btn btn-success">Ver gastos por mes</button> </Link>
                            <Link to="/admin/gastos-depto-actual"> <button className="btn btn-success">Ver gastos por mes</button> </Link>
                        </>
                    }

                    <div className="row mx-auto mt-4">
                        <div className="col-12 col-md-9 mx-auto overflow-auto pb-4">
                            {store.montosTotalesMes.length > 0 &&

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
                                        {store.montosTotalesMes.map((monto, index) => {


                                            return (

                                                <tr key={index}>
                                                    <th scope="row">{monto.year}</th>
                                                    <td>{meses[monto.month]}</td>
                                                    <td>{monto.monto}</td>
                                                    <td>{monto.monto / store.edificioCompleto.numero_departamentos}</td>

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