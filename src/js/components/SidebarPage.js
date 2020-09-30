import React, { useContext } from 'react';
import Sidebar from '../components/sidebar';
import SidebarSuperAdmin from '../components/sidebarSuperAdmin';
import { Context } from '../store/appContext';
import NavBar from './NavBar';
import SidebarAdmin from './SidebarAdmin';
import SidebarConserje from './SidebarConserje';
import SidebarUser from './SidebarUser';

const SidebarPage = (props) => {
    const { store } = useContext(Context)
    return (

        <>

            <div id="wrapper" className="d-md-flex">
                <div className="d-none d-md-flex">
                    <Sidebar >
                        {store.currentRol === "superAdministrador" ?
                            <SidebarSuperAdmin />
                            : store.currentRol === "administrador" ?
                                <SidebarAdmin /> :
                                store.currentRol === "conserje" ?
                                    <SidebarConserje /> :
                                    store.currentRol === "usuario" ?
                                        <SidebarUser /> :
                                        ""
                        }

                    </Sidebar>
                </div>
                <div className="d-block d-md-none">
                    <NavBar >
                        {store.currentRol === "superAdministrador" ?
                            <SidebarSuperAdmin />
                            : store.currentRol === "administrador" ?
                                <SidebarAdmin /> :
                                store.currentRol === "conserje" ?
                                    <SidebarConserje /> :
                                    store.currentRol === "usuario" ?
                                        <SidebarUser /> :
                                        ""
                        }
                        </NavBar>
                </div>
                    <div id="content-wrapper" className="d-flex flex-column">
                        {props.children}
                    </div>

                </div>

        </>
    )
};

export default SidebarPage;