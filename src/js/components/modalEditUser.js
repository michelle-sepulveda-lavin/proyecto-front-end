import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const ModalEditUser = props => {
    const { store, actions } = useContext(Context);
    const limpiarFormulario = (e) =>{
        e.target.reset()
    }

    return (
        <>
            <div className="modal" id="modalEditUser" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="">Editar Usuario</h5>
                        </div>
                        <div className="modal-body">
                            {
                                !!store.error &&
                                <div className="alert alert-danger" role="alert">
                                    {store.error}
                                </div>
                                
                            }
                            {
                                !!store.success &&
                                <div className="alert alert-success" role="alert">
                                    {store.success}
                                </div>
                            }
                            {
                                !!store.allUsuarios?
                                <form onSubmit={e => {
                                    actions.postUsuarios(e)
                                    limpiarFormulario(e)
                                    }}>
                                {/* <div className="form-group">
                                    <label htmlFor="username">Nombre Usuario</label>
                                    <input type="text" className="form-control" name="username"
                                    value={!!props.index ? store.allUsuarios[props.index].username : props.index }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" 
                                    defaultValue={!!props.index ? store.allUsuarios[props.index].email : props.index }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" 
                                    defaultValue={!!props.index ? store.allUsuarios[props.index].password : props.index }
                                    />
                                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rol_id">Rol</label>
                                    <select defaultValue={'default'} name="rol_id" className="form-control" >
                                        <option value="default" disabled>Seleccionar</option>
                                        <option value="superAdministrador">Super Administrador</option>
                                        <option value="administrador" >Administrador</option>
                                        <option value="conserje">Conserje</option>
                                        <option value="usuario">Usuario</option>
                                    </select>
                                </div> */}
                                <div className="form-group">
                                    <label htmlFor="username">Nombre Usuario</label>
                                    <input type="text" className="form-control" name="username" readOnly
                                    value={!!store.allUsuarios ? store.username : "error al cargar" }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" readOnly
                                    value={!!store.allUsuarios  ? store.email : "error al cargar" }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edificio_rol">Edificio id</label>
                                    <input type="number" className="form-control" name="edificio_id"
                                    defaultValue={!!store.allUsuarios ? store.edificio_id : "error al cargar" }
                                    onChange={e=> actions.handleChangeLogin(e)}
                                    />
                                </div>
                                <div className="form-group d-flex justify-content-around">
                                    <button className="btn btn-primary" >Editar</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                            :
                            <p>Cargando</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalEditUser;