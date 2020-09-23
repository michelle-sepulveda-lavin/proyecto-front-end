import React from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';

const GastosAdmin = () => {

    return (
        <SidebarPage>
            <h1>Gastos Comunes</h1>
            <div>
                <Link to="/admin/subir-gastos"> <button className="btn btn-success">Subir Gastos</button> </Link>
            </div >
        </SidebarPage >
    )
};

export default GastosAdmin;