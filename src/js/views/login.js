import React, { useContext, useState } from 'react';
import ModalPassword from '../components/modalPassword';
import { Context } from '../store/appContext';

const Login = () => {
    const {store, actions} = useContext(Context);
    const [state, setState] = useState({
        "username": "",
        "password": ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.loginAction(state)
        e.target.reset();
    }
    const handleChange = (e) =>{
        setState({...state, [e.target.name]: e.target.value})
    }
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
                <form className="text-center col-md-6 m-auto" onSubmit={e => { handleSubmit(e) }}>
                    <div className="form-group">
                        <label htmlFor="usuario">Usuario</label>
                        <input
                            name="username" 
                            type="text"
                            className="form-control"
                            id="usuario"
                            required
                            onChange={e=>handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            name="password" 
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            onChange={e=>handleChange(e)}
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
            </div>
            <ModalPassword />
        </>
    )
};

export default Login;