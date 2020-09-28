import React from 'react';
import { Link } from 'react-router-dom';
import BoletinInactivoTable from '../../components/BoletinInactivoTable';
import SidebarPage from '../../components/SidebarPage';


const HistorialBoletin = () => {
    return (
        <>
            <SidebarPage>
                <h1 className="mt-4">Boletines</h1>
                <h3 className="text-left ml-4">Historial de boletines</h3>
                <BoletinInactivoTable />
                <div className="m-4 pt-4">
                    <Link to="/admin/boletines" style={{ textDecoration: 'none' }}>
                        <span className="boton-a-inicio  shadow">
                            <i className="fas fa-arrow-circle-left"></i> Ir atras
                    </span>
                    </Link>
                </div>
            </SidebarPage>

        </>
    )
};

export default HistorialBoletin;