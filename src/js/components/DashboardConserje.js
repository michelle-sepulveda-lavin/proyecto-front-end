import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';


const DashboardConserje = (props) => {
    const {actions, store} = useContext(Context)

    const filtradoHabitado = () =>{
        const habitados = store.departamentoUsuarios.filter((dpto)=>{
            return dpto.estado == "habitado"
        })
        return habitados
        
    }
    const filtradoDeshabitado = () =>{
        const deshabitados = store.departamentoUsuarios.filter((dpto)=>{
            return dpto.estado == "deshabitado"
        })
        return deshabitados
        
    }

    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getDptosUsuarios()
    }, [])
    return (
        
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col col-md-5 border">
                    <div className="row mb-2">
                        <div className="col-12 text-center">
                            <h4>Departamentos</h4>
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

    )
};

export default DashboardConserje;