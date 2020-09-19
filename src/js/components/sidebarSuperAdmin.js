import React from 'react';
import { Link } from 'react-router-dom';

const SidebarSuperAdmin = () => {
    return (
        <>
            <Link to={"/listado-edificios"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="far fa-building"></i> <p>Edificios </p></li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/contactos"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-envelope-open-text"></i> <p>Contactos </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
            <Link to={"/superAdmin/planes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-envelope-open-text"></i> <p>Planes </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
            <Link to={"/allusuarios"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-users"></i> <p>Usuarios </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
        </>
    )
};

export default SidebarSuperAdmin;