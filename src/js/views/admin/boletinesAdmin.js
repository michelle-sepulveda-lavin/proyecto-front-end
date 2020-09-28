import React from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import BoletinAdm from '../boletinAdm';

const BoletinesAdmin = () => {
    return (
        <>
            <SidebarPage>
                <h1 className="mt-4">Boletines</h1>
                <BoletinAdm />
                <div className="d-flex justify-content-center mb-4">
                    <div>
                        <Link to="/admin/historial-boletines"> <button className="btn btn-secondary">Ver historial</button> </Link>
                    </div>
                </div>
            </SidebarPage>

        </>
    )
};

export default BoletinesAdmin;