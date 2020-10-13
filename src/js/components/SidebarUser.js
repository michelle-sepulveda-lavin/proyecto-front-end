import React from 'react';
import { Link } from 'react-router-dom';

const SidebarUser = () => {
    return (
        <>
            <Link to={"/usuario/paqueteria"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-box-open"></i> <p>Paquetería </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
            <Link to={"/usuario/gastos-comunes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-dollar-sign"></i> <p>Gastos Comunes </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
        </>
    )
};

export default SidebarUser;