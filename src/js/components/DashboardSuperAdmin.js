import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardSuperAdmin = (props) => {

    const { store } = useContext(Context)

    const getLastContactData = async (id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/info-contacto/${id}`);
        const data = await response.json()
        setLastContacts(data)
    }

    const planesMensuales = store.contactos.filter((contactos) => {
        return contactos.plan === "Plan mensual"
    })
    const planesAnuales = store.contactos.filter((contactos) => {
        return contactos.plan === "Plan Anual"
    })

    const [lastContacts, setLastContacts] = useState([])

    useEffect(() => {
        getLastContactData(3)
    }, [])

    return (<>


        <div className="container dashboard-text">
            <div className="row row-cols-1 row-cols-md-2 mt-2">
                <div className="col mb-4">
                    <div className="card shadow-sm bg-dashboard">
                        <div className="card-body">
                            <h2 className="card-title text-center " >Edificios</h2>
                            <h5 className="mt-3">Edificios administrados</h5>
                            <div className="dashboard-num my-5 shadow-sm dashboard-prime-color"><p>{store.edificios.length}</p></div>
                            <h5>Últimos agregados</h5>
                            <ul className="p-0">
                                {store.edificios.length > 0 && store.edificios.slice(0).reverse().map((edificio, index) => {
                                    if (index < 3) {
                                        return <li key={index} className
                                            ="shadow-sm mb-2 rounded card"><p className="font-weight-bold p-2 rounded-top m-0 border-bottom border-info">{edificio.nombre_edificio}</p> <p className="p-2 m-0">{edificio.direccion}</p> <p className="p-2 m-0">{edificio.correo}</p></li>
                                    }
                                })}
                                <h5 className="float-right"> <Link to={"/listado-edificios"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver todos </Link></h5>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="d-flex flex-column">
                        <div className="card mb-4 shadow-sm bg-dashboard">
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
                        <div className="card mb-4 shadow-sm bg-dashboard">
                            <div className="card-body">
                                <h2 className="card-title text-center">Clientes a contactar</h2>
                                <h5>Emails más recientes:</h5>
                                <ul className="p-0 mt-3 text-center">
                                    {lastContacts.map((contacto, index) => {
                                        return <li key={index} className="card shadow-sm mb-3 pt-2 px-1"> <h6>{contacto.email}</h6><h5 className="font-weight-bold dashboard-subtitle">{contacto.plan}</h5></li>
                                    })}
                                </ul>
                                <div className="d-flex justify-content-end">
                                    <Link to={"/contactos"} style={{ textDecoration: 'none', color: "#ffffff" }} className=" btn btn-dashboard mt-2">Ver todos </Link>
                                </div>
                                <div className="mt-3">
                                    <h3 className="text-center mb-3">Planes solicitados</h3>
                                    <div className="row text-center">
                                        <div className="col-md-6">
                                            <h5>Plan Anual</h5>
                                            <div className="dashboard-num dashboard-prime-color my-3 shadow-sm"><p>{planesAnuales.length}</p></div>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Plan Mensual</h5>
                                            <div className="dashboard-num dashboard-prime-color my-3 shadow-sm "><p>{planesMensuales.length}</p></div>
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