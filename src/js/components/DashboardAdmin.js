import React, { useContext, useEffect } from 'react';
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

    useEffect(() => {
        actions.getConserjes(store.currentEdificio)
        actions.getGastosMesActual()
        actions.getEdificioCompleto()
        actions.getDptosUsuarios()
        actions.getPaqueteria()
    }, [])

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-3 mb-4">Edificio {!!store.edificioCompleto ? store.edificioCompleto.nombre_edificio : ""} </h1>
            <div className="row row-cols-1 row-cols-md-2 justify-content-center">

                <div className="col mb-4 border shadow-sm rounded-lg row p-3 justify-content-center">
                    <div className="">
                        <h3>Conserjes Activos</h3>

                    </div>

                    {store.conserjes.length > 0 &&
                        store.conserjes.map((conserje, index) => {
                            if (conserje.estado === true) {
                                return (

                                    <div class="card mb-4 p-2 prueba shadow-sm ">
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
                    <div>
                        <Link to="/conserjes"><button className="ml-3 btn btn-dashboard text-light"> Ver todos</button></Link>
                    </div>
                </div>
                <div className="col mb-4 ml-3 shadow-sm rounded-lg justify-content-center">
                    <div className="border rounded justify-content-center mx-auto">
                        <div className="row mb-2">
                            <div className="col-12 text-center">
                                <h3>Departamentos</h3>
                            </div>
                        </div>
                        <div className="row m-2">
                            <div className="col-lg-4">
                                <span className="ml-md-1 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-green">
                                    <p className="pt-3">{!!store.departamentoUsuarios && filtradoHabitado().length}</p>
                                </span>
                            </div>
                            <div className="col col-lg-4 text-center text-dark pt-3">
                                <h4 >Habitados</h4>
                            </div>
                        </div>
                        <div className="row m-2">
                            <div className="col-lg-4">
                                <span className="ml-md-1 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-blue">
                                    <p className="pt-3">{!!store.departamentoUsuarios && filtradoDeshabitado().length}</p>
                                </span>
                            </div>
                            <div className="col col-lg-4 text-center text-dark pt-3">
                                <h4 >No habitados</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>














        </div>
    )
};

export default DashboardAdmin;