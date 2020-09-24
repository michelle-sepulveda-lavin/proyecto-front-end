import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalAddUser = (props) => {
    const { store, actions } = useContext(Context)
    const [info, setInfo] = useState({});

    return (
        <>
            <div className="modal fade" id="addUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Añadir residente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(e) => actions.addResidente(e, info)}>
                                <div className="form-group">
                                    <label htmlFor="residente">Residente</label>
                                    <select defaultValue={'default'} className="form-control" name="residente" onClick={e => setInfo({...info,"residente": e.target.value })}>
                                        <option value="default" disabled>Seleccionar</option>
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
                                    <select defaultValue={'default'} className="form-control" name="estado" onClick={e => setInfo({...info, "estado": e.target.value })}>
                                        <option value="default" disabled>Seleccionar</option>
                                        <option value="habitado">Habitado</option>
                                        <option value="deshabitado">Deshabitado</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button className="btn btn-primary" >Añadir</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAddUser;