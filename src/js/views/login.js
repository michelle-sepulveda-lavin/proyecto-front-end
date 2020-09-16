import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ModalPassword from '../components/modalPassword';
import { Context } from '../store/appContext';

const Login = props => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {
        if (store.currentUser !== null) history.push("/");

    }, [store.currentUser]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="d-flex justify-content-center">Iniciar Sesion</h1>
                        {
                            store.error !== null && (
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Error</strong>{" "}
                                    {store.error}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <form className="text-center col-md-6 m-auto" onSubmit={(e) => actions.loginAction(e, history)}>
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            name="username"
                            type="text"
                            className={"form-control my-1 text-center" + (!!store.error ? " is-invalid" : "")}
                            value={store.username}
                            placeholder="Ingrese usuario"
                            onChange={actions.handleChangeLogin}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            className={"form-control my-1 text-center" + (!!store.error ? " is-invalid" : "")}
                            value={store.password}
                            placeholder="Ingrese contraseña"
                            onChange={actions.handleChangeLogin}
                        />
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

                    <button className="btn btn-primary">Iniciar sesion</button>
                </form>
                <Link to="./" style={{ textDecoration: 'none' }}>
                    <span className="boton-a-inicio shadow">
                        <i className="fas fa-arrow-circle-left"></i> Ir al inicio
                    </span>
                </Link>
            </div>
            <ModalPassword />
        </>
    )
};

export default Login;