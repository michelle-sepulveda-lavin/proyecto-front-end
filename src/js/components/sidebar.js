import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const Sidebar = (props) => {
    const { store, actions } = useContext(Context)
    const history = useHistory()
    return (
        <>


            <ul className="text-center navbar-nav sidebar bg-gradient-primary">
                    <li className="mb-4">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="sidebar-brand-icon">
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

        </>
    )
};

export default Sidebar;