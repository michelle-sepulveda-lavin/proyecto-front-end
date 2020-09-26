import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';


const DashboardUser = (props) => {
    const { actions } = useContext(Context)
    useEffect(() => {
        actions.getDepartamentoActualUsuario()
    }, [])
    return (
        <h1>Dashboard User</h1>
    )
};

export default DashboardUser;