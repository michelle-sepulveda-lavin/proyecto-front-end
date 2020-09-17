import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import SidebarSuperAdmin from '../components/sidebarSuperAdmin';
import SidebarAdmin from './SidebarAdmin';
import SidebarConserje from './SidebarConserje';
import SidebarUser from './SidebarUser';

const SidebarPage = (props) => {
    const [rol, setRol] = useState("superadmin")
    return (

        <>
            <div id="wrapper" className="d-flex">

                <Sidebar >
                    {rol === "superadmin" ?
                        <SidebarSuperAdmin />
                        : rol === "admin" ?
                            <SidebarAdmin /> :
                            rol === "conserje" ?
                                <SidebarConserje /> :
                                rol === "user" ?
                                    <SidebarUser /> :
                                    <h1>Debes iniciar sesión</h1>
                    }
                    <span className="btn btn-success" onClick={() => {
                        if (rol === "superadmin") {
                            setRol("admin")
                        } else if (rol === "admin") {
                            setRol("conserje")
                        } else if (rol === "conserje") {
                            setRol("user")
                        } else if (rol === "user") {
                            setRol("superadmin")
                        }

                    }}>Rol</span>
                </Sidebar>

                <div id="content-wrapper" className="d-flex flex-column">
                    {props.children}
                </div>

            </div>

        </>
    )
};

export default SidebarPage;