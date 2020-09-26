import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const DashboardUser = (props) => {
    const { store, actions } = useContext(Context);
    

    useEffect(() => {
        actions.getDepartamentoActualInfo()
        actions.getPaqueteriaUsuario()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row justify-content-center ">
                <div className="col col-md-6 border justify-content-center">
                    <div className="row mb-2">
                        <div className="col-12 text-center">
                            <h4>Paquetería</h4>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-lg-4">
                            <span className="ml-md-1 d-flex align-items-center justify-content-center dashboard-num-2 shadow-sm dashboard-green">
                                <p className="pt-3">{!!store.paqueteriaUsuario? store.paqueteriaUsuario.length : "0"}</p>
                            </span>
                        </div>
                        <div className="col col-lg-4 text-center text-dark pt-3">
                            <h4 >Paquetes sin entregar</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardUser;