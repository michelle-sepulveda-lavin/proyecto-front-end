import React from 'react';
import { Link } from 'react-router-dom';

const SidebarUser = () => {
    return (
        <>
            <Link to={"/usuario/gastos-comunes"} style={{ textDecoration: 'none', color: "#eeeeee" }}>
                <li> <i class="fas fa-dollar-sign"></i> <p>Gastos Comunes </p></li>
            </Link>
            <hr className="sidebar-divider"></hr>
        </>
    )
};

export default SidebarUser;