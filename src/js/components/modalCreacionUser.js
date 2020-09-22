import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const ModalCreacionUser = props => {
    const { store, actions } = useContext(Context);
    const limpiarFormulario = (e) => {
        e.target.reset()
    }

    return (
        <>
            <div
                /* id="modalCreacionUser" */
                className="modal"
                tabIndex="-1"
                style={{ display: store.flagModal ? "inline-block" : "none" }}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="">Nuevo Usuario</h5>
                        </div>
                        <div className="modal-body">
                            {
                                !!store.error &&
                                <div className="alert alert-danger" role="alert">
                                    {store.error}
                                </div>
                            }
                            <form onSubmit={e => {
                                actions.crearUsuario(e)
                                limpiarFormulario(e)
                            }}>
                                <div className="form-group">
                                    <label htmlFor="username">Nombre Usuario</label>
                                    <input type="text" className="form-control" name="username" onChange={e => { actions.handleChangeLogin(e) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" onChange={e => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" onChange={e => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rol_id">Rol</label>
                                    <select defaultValue={'default'} name="rol_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                        <option value="default" disabled>Seleccionar</option>
                                        <option value="superAdministrador">Super Administrador</option>
                                        <option value="administrador" >Administrador</option>
                                        <option value="conserje">Conserje</option>
                                        <option value="usuario">Usuario</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edificio_rol">Edificio id</label>
                                    <input type="number" className="form-control" name="edificio_rol" onChange={e => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group d-flex justify-content-around">
                                    <button className="btn btn-primary">Crear</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={actions.cerrarModal}>Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalCreacionUser;