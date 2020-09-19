import React, { useContext, useState } from 'react';
import ModalCreacionUser from '../../components/modalCreacionUser';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Usuarios = () => {
    const {actions} = useContext(Context)
    return (
        <SidebarPage>
            <div className="container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" onClick={actions.activarModal} >
                    Crear Usuario
                </button>
                <ModalCreacionUser/>
                <h1>Listado Usuarios</h1>
            </div>

        </SidebarPage>

    )
};

export default Usuarios;