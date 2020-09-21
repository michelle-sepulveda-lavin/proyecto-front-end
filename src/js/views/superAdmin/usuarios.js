import React, { useContext } from 'react';
import ListadoUsuarios from '../../components/listadoUsuarios';
import ModalCreacionUser from '../../components/modalCreacionUser';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Usuarios = () => {
    const { actions } = useContext(Context)
    return (
        <SidebarPage>
            <div className="container mt-5">
                <div className="col">
                    <h1 className="text-center">Listado de usuarios</h1>
                </div>
                <div className="col d-flex justify-content-center">
                    <button type="button" className="btn btn-primary my-3" data-toggle="modal" data-target="#modalCreacionUser" onClick={actions.activarModal} >
                        Crear Usuario
                    </button>
                    <ModalCreacionUser />
                </div>
                <div className="col-md-10 m-auto">
                    <ListadoUsuarios />
                </div>
            </div>
        </SidebarPage>

    )
};

export default Usuarios;