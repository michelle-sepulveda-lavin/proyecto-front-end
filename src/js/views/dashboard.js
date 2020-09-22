import React, { useContext } from 'react';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardConserje from '../components/DashboardConserje';
import DashboardSuperAdmin from '../components/DashboardSuperAdmin';
import DashboardUser from '../components/DashboardUser';
import SidebarPage from '../components/SidebarPage';
import { Context } from '../store/appContext';



const Dashboard = (props) => {
    const { store } = useContext(Context)
    return (

        <SidebarPage >
            <h1 className="dashboard-title mt-4 ml-md-4 text-center text-md-left">Dashboard</h1>
            <div className="container-fluid">
                <div className=" mb-3">

                    {store.currentRol === "superAdministrador" ?
                        <DashboardSuperAdmin />
                        : store.currentRol === "administrador" ?
                            <DashboardAdmin /> :
                            store.currentRol === "conserje" ?
                                <DashboardConserje /> :
                                store.currentRol === "usuario" ?
                                    <DashboardUser /> :
                                    <h1>Debes iniciar sesión</h1>
                    }
                </div>

            </div>
        </SidebarPage>
    )
};

export default Dashboard;