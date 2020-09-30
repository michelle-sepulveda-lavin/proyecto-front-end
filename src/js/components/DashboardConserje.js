import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel'

const DashboardConserje = (props) => {
    const { store, actions } = useContext(Context)

    const filtradoHabitado = () => {
        const habitados = store.departamentoUsuarios.filter((dpto) => {
            return dpto.estado == "habitado"
        })
        return habitados
    }
    const filtradoDeshabitado = () => {
        const deshabitados = store.departamentoUsuarios.filter((dpto) => {
            return dpto.estado == "deshabitado"
        })
        return deshabitados
    }

    const [gastosDepto, setGastosDepto] = useState("")

    const getGastosDeptoActual = async () => {
        const q = new Date()
        const mes = q.getMonth();
        const year = q.getFullYear();
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userID = JSON.parse(localStorage.getItem("departamento"))
        const edificioID = user.user.edificio.id
        const resp = await fetch(`${store.apiURL}/gastoscomunes/edificio/${edificioID}/${mes}/${year}`)
        const data = await resp.json()
        setGastosDepto(data)

    }

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getConserjes(edificioID)
        actions.getGastosMesActual()
        actions.getEdificioCompleto()
        actions.getDptosUsuarios()
        actions.getPaqueteria()
        getGastosDeptoActual()
        actions.getBoletines(edificioID)
    }, [])

    const filtroBoletin = () => {

        const activos = store.all_boletin.filter((boletin) => {
            return boletin.estado === true
        })
        return activos
    }

    const filtroNoPagado = () => {
        const noPagados = gastosDepto.filter((meses) => {
            return meses.estado === "noPagado"
        })
        return noPagados
    }
    const filtroRevision = () => {
        const revision = gastosDepto.filter((meses) => {
            return meses.estado === "revision"
        })
        return revision
    }

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-3 mb-5">Edificio {!!store.edificioCompleto ? store.edificioCompleto.nombre_edificio : ""} </h1>

            <div className="row row-cols-1 row-cols-md-2">


                <div className="col mb-4">
                    <div className=" card h-100 shadow-sm bg-dashboard border rounded">



                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 text-center text-md-left">
                                    <h2>Boletines</h2>
                                </div>

                                {filtroBoletin().length > 0 ?
                                    <Carousel className="text-dark px-4">
                                        {filtroBoletin().map((boletin, index) => {
                                            return (
                                                < Carousel.Item key={index} >
                                                    <img
                                                        className="d-block w-100 rounded min-h-20"
                                                        src={`../gris2.jpg`}
                                                        alt="slide"
                                                    />
                                                    <Carousel.Caption>
                                                        <h5 className="mb-md-4 text-body">{boletin.asunto}</h5>

                                                    </Carousel.Caption>
                                                </Carousel.Item>

                                            )
                                        })}
                                    </Carousel>
                                    :
                                    <h3 className="text-center">No hay boletines en este momento</h3>
                                }


                            </div>

                            <div className="d-flex justify-content-end mr-2">
                                <Link to={"/conserje/boletines"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col mb-4 ">
                    <div className=" card h-100 shadow-sm bg-dashboard border rounded">

                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 text-center text-md-left">
                                    <h2>Paquetes sin entregar</h2>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 mb-4  d-flex justify-content-center">
                                <div className="col h-100">
                                    <div className="card p-3 bg-db-1">

                                        <div className="d-flex justify-content-center">
                                            <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-1 shadow-sm ">
                                                <p className="pt-3">{!!store.paqueteriaEdificio && store.paqueteriaEdificio.length}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex justify-content-end">
                                <Link to={"/conserje/paqueteria"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="col p-3 h-100">
                    <div className=" card h-100  mb-4 shadow-sm bg-dashboard border rounded">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 text-center text-md-left">
                                    <h2>Departamentos</h2>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 mb-4">
                                <div className="col h-100">
                                    <div className="card p-3 bg-db-4">
                                        <h4 >Habitados</h4>
                                        <div className="d-flex justify-content-end">
                                            <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-4 shadow-sm dashboard-green">
                                                <p className="pt-3">{!!store.departamentoUsuarios && filtradoHabitado().length}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>



                                <div className="col h-100">
                                    <div className="card p-3 bg-db-3 mt-3 mt-md-0">
                                        <h4 >No Habitados</h4>
                                        <div className="d-flex justify-content-end">
                                            <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-3 shadow-sm dashboard-blue">
                                                <p className="pt-3">{!!store.departamentoUsuarios && filtradoDeshabitado().length}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex justify-content-end">
                                <Link to={"/conserje/departamentos"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col p-3 h-100">
                    <div className=" card h-100  mb-4 shadow-sm bg-dashboard border rounded">
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 text-center text-md-left">
                                    <h2>Gastos Comunes</h2>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 mb-4">
                                <div className="col h-100">
                                    <div className="card p-3 bg-db-2">
                                        <h4 >Por Revisar</h4>      <div className="d-flex justify-content-end">                    <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-2 shadow-sm dashboard-green">
                                            <p className="pt-3">{gastosDepto !== "" && filtroRevision().length}</p>
                                        </span>
                                        </div>
                                    </div>
                                </div>



                                <div className="col h-100">
                                    <div className="card p-3 bg-db-3 mt-3 mt-md-0">
                                        <h4 >No Pagados</h4>
                                        <div className="d-flex justify-content-end">
                                            <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-3 shadow-sm dashboard-blue">
                                                <p className="pt-3">{gastosDepto !== "" && filtroNoPagado().length}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex justify-content-end">
                                <Link to={"/conserje/gastos-comunes"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
};

export default DashboardConserje;