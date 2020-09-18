import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardSuperAdmin = (props) => {

    const { store } = useContext(Context)
    const getContactData = async (id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/info-contacto/${id}`);
        const data = await response.json()
        setLastContacts(data)
    }
    const [lastContacts, setLastContacts] = useState([])

    useEffect(() => {
        getContactData(3)
    }, [])

    return (<>


        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 mt-5">
                <div className="col mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center" >Edificios</h2>
                            <h5 className="mt-3">Edificios administrados</h5>
                            <div className="dashboard-num my-5 shadow-sm dashboard-prime-color"><p>{store.edificios.length}</p></div>
                            <h5>Últimos agregados</h5>
                            <ul className="p-0">
                                {store.edificios.length > 0 && store.edificios.map((edificio, index) => {
                                    return <li key={index} className
                                        ="border border-info shadow-sm mb-2 rounded"><p className="font-weight-bold p-2 rounded-top bg-light m-0">{edificio.nombre_edificio}</p> <p className="p-2 m-0">{edificio.direccion}</p> <p className="p-2 m-0">{edificio.correo}</p></li>
                                })}
                                <h5 className="float-right"> <Link to={"/listado-edificios"} style={{ textDecoration: 'none', color: "#000" }}>Ver todos </Link></h5>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="d-flex flex-column">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title">Contratos</h2>
                                <ul>
                                    <li>Próximos a Vencer</li>
                                    <li>Vigentes</li>
                                    <li>Vencidos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h2 className="card-title text-center">Clientes a contactar</h2>
                                <h5>Emails más antiguos:</h5>
                                <ul className="p-0 text-center">
                                    {lastContacts.map((contacto, index) => {
                                        return <li key={index} className="border border-warning  shadow-sm mb-2 pt-2 px-1"> <h6>{contacto.email}</h6><h5 className="font-weight-bold">{contacto.plan}</h5></li>
                                    })}
                                </ul>
                                <Link to={"/contactos"} style={{ textDecoration: 'none', color: "#000" }} className="float-right">Ver todos </Link>
                                <div className="mt-5">
                                    <h5 className="text-center mb-3">Planes solicitados</h5>
                                    <div className="row text-center">
                                        <div className="col-md-6">
                                            <h3>Plan Anual</h3>
                                            <div className="dashboard-num dashboard-secondary-color my-3 shadow-sm"><p>{store.edificios.length}</p></div>
                                        </div>
                                        <div className="col-md-6">
                                            <h3>Plan Mensual</h3>
                                            <div className="dashboard-num dashboard-secondary-color my-3 shadow-sm "><p>{store.edificios.length}</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default DashboardSuperAdmin;