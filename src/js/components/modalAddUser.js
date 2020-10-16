import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const ModalAddUser = (props) => {
    const { store, actions } = useContext(Context)
    const [info, setInfo] = useState();


    return (
        <>
            {
                !!store.departamentoModificar &&
                <>
                    <div className="modal" /* id="addUser" */ tabIndex="-1" /* aria-labelledby="exampleModalLabel" aria-hidden="true" */ style={{ display: store.flagModalAddUser ? "inline-block" : "none" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Añadir residente</h5>
                                </div>
                                {
                                    !!store.error &&
                                    <div className="alert alert-danger" role="alert">
                                        {store.error}
                                    </div>
                                }
                                <div className="modal-body">
                                    <form onSubmit={(e) => actions.addResidente(e, info)}>
                                        <div className="form-group">
                                            <label htmlFor="propietario">Propietario</label>
                                            <select defaultValue={!!store.departamentoModificar && store.departamentoModificar.propietario} className="form-control" name="propietario" onClick={e => setInfo({ ...info, "propietario": e.target.value })}>
                                                {/* <option value="default" disabled>Seleccionar</option> */}
                                                <option value={!!store.departamentoModificar && store.departamentoModificar.propietario}>{!!store.departamentoModificar.propietario ? store.usuariosEdificio.find(elem => elem.id == store.departamentoModificar.propietario).username : ""}</option>

                                                {
                                                    !!store.propietarioNoAsignado &&
                                                    store.propietarioNoAsignado.map((user, index) => {
                                                        return (
                                                            <option value={user.id} key={index}>{user.username}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="residente">Residente</label>
                                            <select defaultValue={!!store.departamentoModificar && store.departamentoModificar.residente} className="form-control" name="residente" onClick={e => setInfo({ ...info, "residente": e.target.value })}>
                                                <option value={!!store.departamentoModificar && store.departamentoModificar.residente} >{!!store.departamentoModificar.residente ? store.finalUserBuilding.find(elem => elem.id == store.departamentoModificar.residente).username : ""}</option>
                                                <option value="default" >Sin usuario</option>
                                                {
                                                    !!store.usuariosEdificioNoAsignados &&
                                                    store.usuariosEdificioNoAsignados.map((user, index) => {
                                                        return (
                                                            <option value={user.id} key={index}>{user.username}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <select defaultValue={'default'} className="form-control" name="estado" onClick={e => setInfo({ ...info, "estado": e.target.value })}>
                                                <option value="default" disabled>Seleccionar</option>
                                                <option value="habitado">Habitado</option>
                                                <option value="deshabitado">Deshabitado</option>
                                            </select>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={actions.cerrarModalAddUsert}>Cancelar</button>
                                            <button className="btn btn-verde" >Añadir</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default ModalAddUser;