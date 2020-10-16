import React from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin = () => {
    return (
        <>
            <Link to={"/conserjes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-users"></i> <p>Conserjes </p> </li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/admin/departamentos"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-home"></i> <p>Departamentos </p></li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/admin/boletines"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-bell"></i> <p>Boletines </p></li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/admin/gastos-comunes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-dollar-sign"></i> <p>Gastos Comunes </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
        </>
    )
};

export default SidebarAdmin;