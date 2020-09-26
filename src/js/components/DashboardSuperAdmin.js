import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardSuperAdmin = () => {
    const [avatar, setAvatar] = useState(null)
    const { store, actions } = useContext(Context)

    const getConserje = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userID = user.user.edificio
        const resp = await fetch(`http://127.0.0.1:5000/conserjes/${userID}`)
        const data = await resp.json()
        setAvatar(data)
    }


    useEffect(() => {
        getConserje()
        actions.getPlanes()

    }, [])

    const planesMensuales = []
    const planesAnuales = []

    const [lastContacts, setLastContacts] = useState([])

    const nuevaFecha = store.edificios.length > 0 && new Date(store.edificios[0].termino_contrato)


    return (<>


        <div className="container dashboard-text">
            <div className="row row-cols-1 row-cols-md-2 mt-2">
                <div className="col mb-4">
                    <div className="card h-100 shadow-sm bg-dashboard">
                        <div className="card-body">
                            <h2 className="card-title text-center " >Edificios</h2>
                            <h5 className="mt-3">Edificios administrados</h5>
                            <div className="dashboard-num my-5 shadow-sm dashboard-prime-color" onClick={() => console.log(avatar)
                            }><p>{store.edificios.length}</p></div>
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


                    <div className="card h-100 mb-4 shadow-sm bg-dashboard">
                        <div className="card-body">
                            <h2 className="card-title text-center">Clientes a contactar</h2>
                            <h5>Emails más recientes:</h5>
                            <ul className="p-0 mt-3 text-center">
                                {store.contactos.length > 0 && store.contactos.slice(0).reverse().map((contacto, index) => {
                                    if (index < 3 && Object.keys(contacto).some((k) => {
                                        return contacto[k] === true;
                                    })) {
                                        return <li key={index} className="card shadow-sm mb-3 pt-2 px-1"> <h6>{contacto.email}</h6><h5 className="font-weight-bold dashboard-subtitle">{contacto.plan}</h5></li>
                                    }
                                })}
                                {!store.contactos.includes(true)
                                    && <p>No hay correos sin contactar</p>}

                            </ul>
                            <div className="d-flex justify-content-end">
                                <Link to={"/contactos"} style={{ textDecoration: 'none', color: "#ffffff" }} className=" btn btn-dashboard mt-2">Ver todos </Link>
                            </div>
                            <div className="mt-5">
                                <h3 className="text-center mb-5">Planes solicitados</h3>
                                <div className="row text-center row-cols-md-2">
                                    {store.planes.map((plan, index) => {
                                        return (
                                            <div key={index} className="col">
                                                <h5 className="mb-3">{plan.name}</h5>
                                                <div className="dashboard-num dashboard-prime-color my-3 shadow-sm"><p>{store.contactos.filter((contacto) => contacto.plan === plan.name).length}</p></div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="card mb-4 shadow-sm bg-dashboard">
                <div className="card-body">
                    <h2 className="card-title text-center">Contratos</h2>
                    <ul className="p-0 mt-5 justify-content-center row">
                        <li className="d-flex mb-3 text-dark align-items-center justify-content-center row col-md-4"> <div className="col col-lg-6 d-flex justify-content-center"><div><span className="ml-md-5 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-yellow"><p className="pt-3">{store.contratos.porVencer.length}</p></span></div> </div> <div className="col col-lg-6 text-center"><h4 >Próximos a Vencer</h4> </div></li>

                        <li className="d-flex mb-3 col-md-4 align-items-center justify-content-center row"> <div className="col col-lg-6 d-flex justify-content-center"><div><span className="ml-md-5 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-red"><p className="pt-3">{store.contratos.vencidos.length}</p></span> </div></div> <div className="col col-lg-6 text-center text-dark"><h4 >Vencidos</h4> </div></li>


                        <li className="d-flex col-md-4 align-items-center justify-content-center row"> <div className="col col-lg-6 d-flex justify-content-center"><div><span className="ml-md-5 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-green"><p className="pt-3">{store.contratos.vigentes.length}</p></span> </div></div> <div className="col col-lg-6 text-center"><h4 className="text-dark">Vigentes</h4> </div></li>

                    </ul>
                    <div className="d-flex justify-content-center">
                        <Link to={"/contratos"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-4">Ver detalle </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default DashboardSuperAdmin;