import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

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
            </ul>

        </>
    )
};

export default Sidebar;