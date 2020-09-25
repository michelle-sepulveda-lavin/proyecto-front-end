import React from 'react';
import SidebarPage from '../../components/SidebarPage';
import BoletinAdm from '../boletinAdm';

const BoletinesAdmin = () => {
    return (
        <>
        <SidebarPage>
            <h1>Boletines Administrador</h1>
            <BoletinAdm />
        </SidebarPage>
        
        </>
    )
};

export default BoletinesAdmin;