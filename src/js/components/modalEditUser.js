import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalEditUser = props => {
    const { store, actions } = useContext(Context);

    const limpiarFormulario = (e) => {
        e.target.reset()
    }

    return (
        <>
            <div
                className="modal"
                /* id="modalEditUser" */
                tabIndex="-1"
                style={{ display: store.flagModalEditUser ? "inline-block" : "none" }}
            >
                <div className="modal-dialog">
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
                                !!store.allUsuarios ?
                                    <form onSubmit={e => {
                                        actions.postUsuarios(e)
                                        limpiarFormulario(e)
                                    }}>
                                        <div className="form-group">
                                            <label htmlFor="username">Nombre Usuario</label>
                                            <input type="text" className="form-control" name="username" readOnly
                                                value={!!store.allUsuarios ? store.username : "error al cargar"}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" name="email" readOnly
                                                value={!!store.allUsuarios ? store.email : "error al cargar"}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="edificio_id">Edificio id</label>
                                            <select defaultValue={'default'} name="edificio_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                                <option value="default" disabled >Seleccionar</option>
                                                {
                                                    !!store.edificios &&
                                                    store.edificios.map((edificio, index) => {
                                                        return (
                                                            <option key={index} value={edificio.id}>{edificio.nombre_edificio}</option>
                                                        )
                                                    })

                                                }
                                            </select>
                                        </div>
                                        <div className="form-group d-flex justify-content-around">
                                            <button className="btn btn-primary" >Editar</button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={actions.cerrarModalEdit}>Cerrar</button>
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