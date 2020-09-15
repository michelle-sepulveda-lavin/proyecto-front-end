import React from 'react';
import ModalPassword from '../components/modalPassword';

const Login = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="d-flex justify-content-center">Edificios Felices</h1>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <form className="text-center col-md-6 m-auto">
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input type="text" className="form-control" id="usuario" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="form-group form-check">
                        <p>
                            Olvidaste tu contraseña?
                            <a href="/login" data-toggle="modal" data-target="#staticBackdrop">
                                Recuperar
                            </a>
                        </p>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="recordarPassword" />
                        <label className="form-check-label" htmlFor="recordarPassword">Recordar Contraseña</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar sesion</button>
                </form>
            </div>
            <ModalPassword/>
        </>
    )
};

export default Login;