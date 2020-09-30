import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';
import BoletinAdm from '../boletinAdm';

const BoletinesAdmin = () => {
    const { actions } = useContext(Context)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getBoletines(edificioID)

    }, [])
    return (
        <>
            <SidebarPage>
                <h1 className="mt-4">Boletines</h1>
                <BoletinAdm />
                <div className="d-flex justify-content-center mb-4">
                    <div>
                        <Link to="/admin/historial-boletines"> <button className="btn btn-azul">Ver historial</button> </Link>
                    </div>
                </div>
            </SidebarPage>

        </>
    )
};

export default BoletinesAdmin;