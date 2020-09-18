import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const Sidebar = (props) => {
    const {actions} = useContext(Context)
    const history = useHistory()
    return (
        <>

            <ul className="text-center navbar-nav sidebar bg-gradient-primary">
                <li className="mb-4">
                    <div className=".sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-icon">
                            <img alt="logo" className="img-fluid pt-3" src="https://richardgarcia.net/wp-content/uploads/2019/02/zOOM-LOGOS-PNG.png" />
                        </div>
                    </div>
                </li>
                <Link to={"/dashboard"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                    <li> <i className="fas fa-align-justify nav-item mt-3"></i> <p>Dashboard </p></li>
                </Link>
                < hr className="sidebar-divider"></hr>
                {props.children}
                <Link to="/" style={{ textDecoration: 'none', color: "#eeeeee" }} onClick={()=>actions.handleClose(history)}>
                    <i className="fas fa-power-off"></i><p>Cerrar sesion</p>
                </Link>
            </ul>

        </>
    )
};

export default Sidebar;