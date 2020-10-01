import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';
import BoletinAdm from '../boletinAdm';

const BoletinesAdmin = () => {
    const { actions, store } = useContext(Context)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getBoletines(edificioID)
        usuariosEdificio(edificioID)
    }, [])

    const [usuarios, setUsuarios] = useState([])

    const usuariosEdificio = async (id) => {

        try {
            const resp = await fetch(`${store.apiURL}/usuarios/edificio/${id}`);
            const data = await resp.json()
            if (resp.ok) {
                setUsuarios(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SidebarPage>
                <h1 className="mt-3">Boletines</h1>
                <BoletinAdm usuarios={usuarios} />
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