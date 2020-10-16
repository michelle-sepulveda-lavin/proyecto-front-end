import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalPassword = () => {
    const {store, actions} = useContext(Context)
    const [correo, setCorreo] = useState(null);

    const savePassword = (e) => {
        setCorreo(e.target.value)
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-auto pl-5" id="staticBackdropLabel">Recuperar Contraseña</h5>
                        </div>
                        {
                            !!store.msgEmail ?
                                <>
                                    <div className="modal-body">
                                        <p>{store.msgEmail}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={actions.resetMsg}>Cerrar</button>
                                    </div>
                                </>
                                :
                                <form onSubmit={e => { actions.buscarEmail(e, correo) }}>
                                    <div className="form-group">
                                        <div className="modal-body">
                                            <label htmlFor="password">Email</label>
                                            <input type="email"
                                                className="form-control"
                                                id="password"
                                                placeholder="Ingrese su email"
                                                onChange={e => savePassword(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                        <button className="btn btn-primary">Recuperar</button>
                                    </div>
                                </form>
                        }

                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalPassword;