import React, { useState } from 'react';
import DashboardAdmin from '../components/DashboardAdmin';
import DashboardConserje from '../components/DashboardConserje';
import DashboardSuperAdmin from '../components/DashboardSuperAdmin';
import DashboardUser from '../components/DashboardUser';
import SidebarPage from '../components/SidebarPage';



const Dashboard = (props) => {
    const [rol, setRol] = useState("superadmin")
    return (

        <SidebarPage >
            <h1 className="dashboard-title my-4 ml-md-4 text-center text-md-left">Dashboard</h1>
            <div className="container-fluid">
                <div className="card-dashboard shadow">

                    {rol === "superadmin" ?
                        <DashboardSuperAdmin />
                        : rol === "admin" ?
                            <DashboardAdmin /> :
                            rol === "conserje" ?
                                <DashboardConserje /> :
                                rol === "user" ?
                                    <DashboardUser /> :
                                    <h1>Debes iniciar sesión</h1>
                    }
                </div>
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
            </div>
        </SidebarPage>
    )
};

export default Dashboard;