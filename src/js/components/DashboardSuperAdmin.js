import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardSuperAdmin = () => {
    const { store, actions } = useContext(Context)

    const getUno = async () => {
        const resp = await fetch(`${store.apiURL}/register`)
        const data = await resp.json()
    }

    useEffect(() => {
        actions.getPlanes()
        actions.getEdificiosData()
        actions.getContactData()
        getUno()

    }, [])


    const filtradoPorVencer = () => {

        const porVencer = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            const mesContrato = fechaContrato.getMonth()
            const mesActual = store.currentDate.getMonth();
            const proximoVencer = (mesContrato - mesActual) <= 1 ? true : false;
            return (store.currentDate < fechaContrato && proximoVencer)
        })
        return porVencer
    }
    const filtradoVencido = () => {

        const vencido = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            return (fechaContrato < store.currentDate)
        })
        return vencido
    }
    const filtradoVigente = () => {

        const vigente = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            const mesContrato = fechaContrato.getMonth()
            const mesActual = store.currentDate.getMonth();
            const proximoVencer = (mesContrato - mesActual) <= 1 ? true : false;
            return (fechaContrato > store.currentDate && (proximoVencer === false))
        })
        return vigente
    }


    return (<>


        <div className="container dashboard-text">
            <div className="row row-cols-1 row-cols-md-2 mt-2">
                <div className="col mb-4">
                    <div className="card h-100 shadow-sm bg-dashboard">
                        <div className="card-body">
                            <h2 className="card-title text-center" >Edificios</h2>
                            <h5 className="mt-3">Edificios administrados</h5>
                            <div className="row justify-content-center">
                                <div className="card col-9 col-md-6 my-4 p-3 bg-db-1">

                                    <div className="d-flex justify-content-center p-3">
                                        <span className="ml-md-1 big-font d-flex align-items-center justify-content-center p-5 btn-db-1 shadow-sm">
                                            <p className="pt-3">{store.edificios.length  > 0? store.edificios.length : "0"}</p>
                                        </span>
                                    </div>
                                </div>
                            </div>
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



                                <div className="row row-cols-1 row-cols-md-2 mb-4">

                                    {store.planes.map((plan, index) => {
                                        return (

                                            <div key={index} className="col h-100">
                                                <div className={"mb-3 card p-3 text-white" + (index % 2 === 0 ? " bg-db-4" : " bg-db-2")}>
                                                    <h4 >{plan.name}</h4>
                                                    <div className="d-flex justify-content-end">
                                                        <span className={"ml-md-1 d-flex align-items-center justify-content-center btn-db-2 shadow-sm dashboard-green" + (index % 2 === 0 ? " btn-db-4" : " btn-db-2")}>
                                                            <p className="pt-3">{store.contactos.filter((contacto) => contacto.plan === plan.name).length}</p>
                                                        </span>
                                                    </div>
                                                </div>
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
                    <ul className="p-0 mt-4 justify-content-center row">

                        <li className="d-flex mb-3 col-md-4 align-items-center justify-content-center row"> <div className="col col-lg-6 d-flex justify-content-center"><div className={"card p-3 text-white bg-db-4"}>  <span className={"ml-md-1 d-flex align-items-center justify-content-center btn-db-4 shadow-sm "}>
                            <p className="pt-3">{filtradoPorVencer().length}</p>
                        </span></div></div> <div className="col col-lg-6 text-center text-dark"><h4 >Por vencer</h4> </div></li>

                        <li className="d-flex mb-3 col-md-4 align-items-center justify-content-center row"> <div className="col col-lg-6 d-flex justify-content-center"><div className={"card p-3 text-white bg-db-4"}>  <span className={"ml-md-1 d-flex align-items-center justify-content-center btn-db-4 shadow-sm "}>
                            <p className="pt-3">{filtradoVencido().length}</p>
                        </span></div></div> <div className="col col-lg-6 text-center text-dark"><h4 >Vencidos</h4> </div></li>


                        <li className="d-flex col-md-4 align-items-center justify-content-center row"> <div className="col col-lg-6 d-flex justify-content-center"><div className={"card p-3 text-white bg-db-2"}>  <span className={"ml-md-1 d-flex align-items-center justify-content-center btn-db-2 shadow-sm"}>
                            <p className="pt-3">{filtradoVigente().length}</p>
                        </span></div></div> <div className="col col-lg-6 text-center"><h4 className="text-dark">Vigentes</h4> </div></li>

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