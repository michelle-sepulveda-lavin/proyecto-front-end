import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardAdmin = (props) => {
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
        const edificioID = user.user.edificio
        const resp = await fetch(`${store.apiURL}/gastoscomunes/edificio/${edificioID}/${mes}/${year}`)
        const data = await resp.json()
        setGastosDepto(data)

    }

    useEffect(() => {
        actions.getConserjes(store.currentEdificio.id)
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio
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
            <h1 className="text-center mt-3 mb-4">Edificio {!!store.edificioCompleto ? store.edificioCompleto.nombre_edificio : ""} </h1>
            <div className="card mb-4 shadow-sm bg-dashboard">
                <div className="card-body">
                    <h2 className="card-title mt-3 mb-3 text-center text-md-left">Boletines Activos</h2>
                    <ul className="p-0 justify-content-start align-items-center row row-cols-1 mb-1 row-cols-md-3">
                        {store.all_boletin.length > 0 &&
                            filtroBoletin().map((boletin, index) => {


                                return <li key={index} className="h-100 pt-0 pl-4 pr-4 col mb-3 text-dark ">  <div className="bg-db-3 row py-2"><div className="col-12 col-md-3 d-flex align-items-center"><img className="img-fluid  d-inline" src="../email.png" /></div> <h4 className="p-3 col-md-9 col-12 d-inline rounded-lg" >{boletin.asunto}</h4> </div> </li>


                            })

                        }


                    </ul >
                    <div className="d-flex justify-content-end">
                        <Link to={"/admin/boletines"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                    </div>
                </div >
            </div >
            <div className="row row-cols-1 row-cols-md-2 mt-2">

                <div className="col p-3 mb-4 h-100 ">
                    <div className="card shadow-sm rounded-lg row justify-content-center">
                        <div className="container card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 mt-3 text-center text-md-left">
                                    <h2>Conserjes Activos</h2>
                                </div>
                            </div>

                            {store.conserjes.length > 0 &&
                                store.conserjes.map((conserje, index) => {
                                    if (conserje.estado === true) {
                                        return (

                                            <div class="card mb-2 mb-md-4 p-2 prueba shadow-sm ">
                                                <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                                    <div className="w-75 d-flex align-items-center" >

                                                        <div className="d-flex align-items-center  flex-column">  <img src="../user.png" className="img-fluid w-40" />
                                                            <div className="text-center">
                                                                <h3>{conserje.nombre}</h3>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="w-75 conserjes-activos">

                                                        <ul className="p-0">

                                                            <li><strong>Teléfono: </strong>{conserje.telefono}</li>
                                                            <li className="mt-md-2"><strong>Email: </strong>{conserje.usuario.email}</li>
                                                            <li className="mt-md-2"><strong>Turno: </strong>{conserje.turno}</li>

                                                        </ul>

                                                    </div>

                                                </div>
                                            </div>


                                        )
                                    }
                                })



                            }
                            {}
                            <div className="">
                                <Link to="/conserjes"><button className="w-100 btn btn-dashboard text-light"> Ver todos</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col mb-4 h-100 p-md-3 p-0">
                    <div className="row-cols-1">
                        <div className="col p-0 h-100">
                            <div className=" card h-100 p-3 mb-4 shadow-sm bg-dashboard border rounded">
                                <div className="card-body">
                                    <div className="row mb-2">
                                        <div className="col-12 mb-4 text-center text-md-left">
                                            <h2>Departamentos</h2>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 row-cols-md-2 mb-4">
                                        <div className="col h-100">
                                            <div className="card p-3 bg-db-1">
                                                <h4 >Habitados</h4>
                                                <div className="d-flex justify-content-end">
                                                    <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-1 shadow-sm dashboard-green">
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
                                </div>
                            </div>
                        </div>
                        <div className="col p-0 h-100">
                            <div className=" card h-100 p-3 mb-4 shadow-sm bg-dashboard border rounded">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default DashboardAdmin;