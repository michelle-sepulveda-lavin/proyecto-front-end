import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

const RecuperacionContraseña = () => {
    const { store, actions } = useContext(Context)
    const parametros = useParams();
    const history = useHistory();

    return (
        <div className="mb-5 pb-5">
            <div className="container mt-5 pb-5">
                <h3 className="text-center">Reestablecer Contraseña</h3>
            </div>
            <div className="container mt-3">
                <form className="col-md-6 m-auto border p-5 border-success rounded" onClick={e => actions.handleSubmitContraseña(e, parametros, history)}>
                    <div className="form-group row mt-5">
                        <label htmlFor="password" className="col-sm-4 col-form-label">Nueva Contraseña</label>
                        <div className="col-sm-8">
                            <input type="password"
                                className={"form-control"}
                                placeholder="Contraseña"
                                name="password"
                                onChange={e => actions.handleChangeLogin(e)} />
                        </div>
                    </div>
                    <div className="form-group row pt-3">
                        <label htmlFor="passwordConfirmacion" className="col-sm-4 col-form-label">Confirmar Contraseña</label>
                        <div className="col-sm-8">
                            <input type="password"
                                className={
                                    "form-control" + (store.passwordConfirmacion !== "" && store.password !== store.passwordConfirmacion ? " is-invalid" : "")
                                } name="passwordConfirmacion"
                                placeholder="Contraseña"
                                onChange={e => actions.handleChangeLogin(e)} />
                        </div>
                    </div>
                    <button className="btn btn-verde btn-block my-4">Reestablecer contraseña</button>
                </form>
            </div>
        </div>
    )
};

export default RecuperacionContraseña;