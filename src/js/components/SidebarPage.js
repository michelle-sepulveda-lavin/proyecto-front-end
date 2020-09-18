import React, { useContext, useState } from 'react';
import Sidebar from '../components/sidebar';
import SidebarSuperAdmin from '../components/sidebarSuperAdmin';
import { Context } from '../store/appContext';
import SidebarAdmin from './SidebarAdmin';
import SidebarConserje from './SidebarConserje';
import SidebarUser from './SidebarUser';

const SidebarPage = (props) => {
    const { store } = useContext(Context)
    return (

        <>
            <div id="wrapper" className="d-flex">

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

                <div id="content-wrapper" className="d-flex flex-column">
                    {props.children}
                </div>

            </div>

        </>
    )
};

export default SidebarPage;