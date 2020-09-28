import React from 'react';
import { Link } from 'react-router-dom';

const SidebarConserje = () => {
    return (
        <>
            <Link to={"/conserje/departamentos"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-home"></i> <p>Departamentos </p></li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/conserje/boletines"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-bell"></i> <p>Boletines </p></li>
            </Link>
            < hr className="sidebar-divider"></hr>
            <Link to={"/conserje/gastos-comunes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-dollar-sign"></i> <p>Gastos Comunes </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
            <Link to={"/conserje/paqueteria"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i className="fas fa-box-open"></i> <p>Paqueteria </p> </li>
            </Link>
            <hr className="sidebar-divider"></hr>
        </>
    )
};

export default SidebarConserje;