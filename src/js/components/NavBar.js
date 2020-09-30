import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const NavBar = (props) => {
    const { store, actions } = useContext(Context)
    const history = useHistory()
    return (
        <>

            <div className="d-flex" id="wrapper2">

                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="text-center navbar-nav sidebar-horizontal bg-gradient-primary">
                                <li className="mb-4">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="sidebar-brand-icon2">
                                            <img alt="logo" className="img-fluid pt-3" src="../edificos-felices-logo.png" />
                                        </div>
                                    </div>
                                </li>
                                <Link to={"/dashboard"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                                    <li> <i className="fas fa-align-justify nav-item mt-3"></i> <p>Dashboard </p></li>
                                </Link>
                                < hr className="sidebar-divider"></hr>
                                {props.children}
                                {
                                    !!store.currentRol ?
                                        <Link to="/" style={{ textDecoration: 'none', color: "#eeeeee" }} onClick={() => actions.handleClose(history)}>
                                            <i className="fas fa-power-off"></i><p>Cerrar sesion</p>
                                        </Link>
                                        :
                                        <Link to="/login" style={{ textDecoration: 'none', color: "#eeeeee" }} onClick={() => actions.handleClose(history)}>
                                            <i className="fas fa-sign-in-alt"></i><p>Iniciar sesion</p>
                                        </Link>
                                }
                            </ul>
                        </div>
                    </nav>

                </div>

            </div>

        </>
    )
};

export default NavBar;