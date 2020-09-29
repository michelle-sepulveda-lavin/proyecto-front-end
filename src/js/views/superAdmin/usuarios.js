import React, { useContext, useEffect } from 'react';
import ListadoUsuarios from '../../components/listadoUsuarios';
import ModalCreacionUser from '../../components/modalCreacionUser';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Usuarios = () => {
    const { actions, store } = useContext(Context)

    useEffect(()=>{
        actions.getEdificiosData()
        actions.getRoles()
    }, [])

    return (
        <SidebarPage>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center">Usuarios</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <button type="button" className="btn bg-db-1 text-white my-3" data-toggle="modal" data-target="#modalCreacionUser" onClick={actions.activarModal} >
                            Crear Usuario
                        </button>
                        <ModalCreacionUser />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <ListadoUsuarios />
                    </div>
                </div>
            </div>
        </SidebarPage>

    )
};

export default Usuarios;