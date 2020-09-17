import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const RecuperacionContraseña = () => {
    const {store, actions} = useContext(Context)

    return (
        <>
            <div className="container mt-4">
                <h3 className="text-center">Reestablecer Contraseña</h3>
            </div>
            <div className="container mt-5">
                <form className="col-md-6 m-auto border p-5 border-success rounded" onClick={actions.handleSubmitContraseña}>
                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-4 col-form-label">Email</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" placeholder="Introduce email" name="email" onChange={e => actions.handleChangeLogin(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-4 col-form-label">Nueva Contraseña</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" placeholder="Contraseña" name="password" onChange={e => actions.handleChangeLogin(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="passwordConfirmacion" className="col-sm-4 col-form-label">Confirmar Contraseña</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" name="passwordConfirmacion" placeholder="Contraseña" onChange={e => actions.handleChangeLogin(e)} />
                        </div>
                    </div>
                    <button className="btn btn-success btn-block">Reestablecer contraseña</button>
                </form>
            </div>
        </>
    )
};

export default RecuperacionContraseña;