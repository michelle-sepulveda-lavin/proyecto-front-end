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
                                !!store.errorCreacionUser &&
                                <div className="alert alert-danger" role="alert">
                                    {store.errorCreacionUser}
                                </div>
                            }
                            <form onSubmit={e => {
                                actions.crearUsuario(e)
                                limpiarFormulario(e)
                                /* actions.levantaBanderaUsuarios() */
                            }}>
                                <div className="form-group">
                                    <label htmlFor="username">Nombre Usuario</label>
                                    <input type="text" className="form-control" value={store.username} name="username" onChange={e => { actions.handleChangeLogin(e) }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" value={store.email} name="email" onChange={e => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" value={store.password} name="password" onChange={e => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    {
                                        !!store.currentEdificioID ?
                                            <>
                                                <label htmlFor="rol_id">Rol</label>
                                                <select defaultValue={'default'} name="rol_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                                    <option value="default" disabled>Seleccionar</option>
                                                    <option value="usuario">Usuario</option>
                                                    <option value="propietario">Propietario</option>
                                                </select>
                                            </>
                                            :
                                            <>
                                                <label htmlFor="rol_id">Rol</label>
                                                <select defaultValue={'default'} name="rol_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                                    <option value="default" disabled>Seleccionar</option>
                                                    {
                                                        !!store.roles &&
                                                        store.roles.map((rol, index)=>{
                                                            return(
                                                                <option key={index} value={rol.id}>{rol.rol}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </>
                                    }
                                </div>
                                <div className="form-group">
                                    {
                                        !!store.currentEdificioID ?
                                            <>
                                                <label htmlFor="edificio_id">Edificio</label>
                                                <select defaultValue={'default'} name="edificio_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                                    <option value="default" disabled>Seleccionar</option>
                                                    <option value={store.currentEdificioID}>{!!store.edificioCompleto && store.edificioCompleto.nombre_edificio}</option>


                                                </select>
                                            </>
                                            :
                                            <>
                                                <label htmlFor="edificio_id">Edificio</label>
                                                <select defaultValue={'default'} name="edificio_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                                    <option value="default" disabled>Seleccionar</option>
                                                    <option value="default">Ninguno</option>
                                                    {
                                                        !!store.edificios &&
                                                        store.edificios.map((edificio, index)=>{
                                                            return(
                                                                <option key={index} value={edificio.id}>{edificio.nombre_edificio}</option>
                                                            )
                                                        })
                                                    }


                                                </select>
                                            </>
                                    }
                                </div>
                                <div className="form-group d-flex justify-content-around">
                                    <button className="btn btn-azul">Crear</button>
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