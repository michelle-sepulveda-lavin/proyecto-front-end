import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ModalPassword from '../components/modalPassword';
import { Context } from '../store/appContext';
import Background from '../../img/FAVPNG_building-poster-banner-wallpaper_VQmBR0TP.png'

const Login = props => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    const sectionStyle = {
        width: "100%",
        height: "100%",
        backgroundImage: `url(${Background})`
    }

    useEffect(() => {
/*         if (store.currentUser !== null) history.push("/dashboard"); */
        actions.mostrarUsuario()

    }, [store.currentUser]);

    return (
        <div className="container-fluid bg-white pt-4" style={sectionStyle}>
            <div className="container my-5 pb-5">
                <div className="card col-md-6 m-auto px-0" style={{ backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "30px" }}>
                    <div className="card-header login-background text-white text-center" style={{ borderTopLeftRadius: "30px", borderTopRightRadius: "30px" }}>
                        <h1 style={{ fontFamily: 'fantasy' }}>
                            Bienvenido
                        </h1>
                    </div>
                    <div className="card-body m-0 p-0 text-center">
                        {
                            !!store.errorLogin && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {store.errorLogin}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            )
                        }
                        <form className="" onSubmit={(e) => { actions.loginAction(e, history) }}>
                            <label htmlFor="usuario" className="sr-only">Usuario</label>
                            <div className="input-group mt-5" style={{ width: "60%", margin: "auto" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text login-background text-white"><i className="fas fa-user"></i></div>
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    className={"form-control  text-center" + (!!store.errorLogin ? " is-invalid" : "")}
                                    value={store.username}
                                    placeholder="Usuario"
                                    onChange={actions.handleChangeLogin}
                                />
                            </div>

                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <div className="input-group mt-5" style={{ width: "60%", margin: "auto" }}>
                                <div className="input-group-prepend">
                                    <div className="input-group-text login-background text-white"><i className="fas fa-key"></i></div>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    className={"form-control text-center" + (!!store.errorLogin ? " is-invalid" : "")}
                                    value={store.password}
                                    placeholder="Contraseña"
                                    onChange={actions.handleChangeLogin}
                                />
                            </div>
                            <div className="form-group form-check">
                                <span className="pr-2">Olvidaste tu contraseña?</span>
                                <a style={{color: " #121975"}} href="/login" data-toggle="modal" data-target="#staticBackdrop">
                                    Recuperar
                                </a>
                                <ModalPassword />

                            </div>
                            <div className="form-group form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    disabled={!store.username ? true : ""}
                                    checked={store.flagRecordar ? true : false}
                                    id="recordarPassword" onClick={e => actions.handleRecordar(e)}
                                />
                                <label className="form-check-label" htmlFor="recordarPassword">Recordar Usuario</label>
                            </div>
                            <button className="btn login-background text-white mb-5">Iniciar sesion</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="m-auto pb-5">
                        <Link to="./" style={{ textDecoration: 'none' }}>
                            <span className="boton-a-inicio shadow bg-white">
                                <i className="fas fa-arrow-circle-left bg-white"></i> Ir al inicio
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;