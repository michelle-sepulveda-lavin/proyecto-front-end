import React, { useState } from 'react';

const ModalPassword = () => {
    const [correo, setCorreo] = useState(null);
    const [test, setTest] = useState(null);

    const savePassword = (e) => {
        setCorreo(e.target.value)
    };
    const handleSubmit = e => {
        e.preventDefault();
        setTest(correo);
    };

    return (
        <>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title m-auto pl-5" id="staticBackdropLabel">Recuperar Contraseña</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {
                            !!test ?
                                <>
                                    <div className="modal-body">
                                        <p>Se ha enviado un enlace a tu correo, Revisalo!</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    </div>
                                </>
                                :
                                <form onSubmit={e => { handleSubmit(e) }}>
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