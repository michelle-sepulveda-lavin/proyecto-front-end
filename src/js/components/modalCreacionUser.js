import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const ModalCreacionUser = props => {
    const { store, actions } = useContext(Context)
    const history = useHistory();
    const [datos, setDatos] = useState({});
    const handleDatos = e => {
        setDatos({ ...datos, [e.target.name]: e.target.value.toLowerCase() })
    }


    return (
        <>
            <div
                className="modal"
                tabIndex="-1"
                style={{display: store.flagModal? "inline-block" :"none"}}
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
                            <form onSubmit={e => actions.crearUsuario(e, datos, history)}>
                                <div className="form-group">
                                    <label htmlFor="username">Nombre Usuario</label>
                                    <input type="text" className="form-control" name="username"  onChange={e => handleDatos(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email"  onChange={e => handleDatos(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"  onChange={e => handleDatos(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rol_id">Rol</label>
                                    <select name="rol_id" className="form-control" onChange={e => handleDatos(e)}>
                                        <option disabled selected>Seleccionar</option>
                                        <option value="superAdministrador">Super Administrador</option>
                                        <option value="administrador" >Administrador</option>
                                        <option value="conserje">Conserje</option>
                                        <option value="usuario">Usuario</option>
                                    </select>
                                </div>
                                <div className="form-group d-flex justify-content-around">
                                    <button className="btn btn-primary">Crear</button>
                                    <button type="button" className="btn btn-secondary d-flex jsutify-content-end" data-dismiss="modal">Cancelar</button>
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