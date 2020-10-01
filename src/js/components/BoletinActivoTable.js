import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const BoletinActivoTable = (props) => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getBoletines(edificioID)
    }, [])

    const filtroBoletin = () => {
        const activos = store.all_boletin.filter((boletin) => {
            return boletin.estado === true
        })
        return activos
    }


    return (
        <>
            <div className="row container mt-4">
                <table className="table  table-bordered border col-10 mx-auto  overflow-auto ">
                    <thead className="btn-oscuro text-center">
                        <tr>
                            <th>ID</th>
                            <th>Asunto</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="overflow-auto">
                        {
                            store.all_boletin.length > 0 ?
                                filtroBoletin().map((edificio, index) => (
                                    <tr key={edificio.edificio_id} >
                                        <th scope="row">{edificio.id}</th>
                                        <td className="text-center">{edificio.asunto}</td>
                                        <td className="text-break w-50"><p>{edificio.body}</p></td>
                                        <td>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input" id={"customSwitch" + index} defaultChecked={edificio.estado === true ? "checked" : ""} />
                                                <label className="custom-control-label" htmlFor={"customSwitch" + index} onClick={(e) => {
                                                    let estado = "";
                                                    if (edificio.estado === false) {
                                                        estado = true
                                                    } else {
                                                        estado = false
                                                    }
                                                    actions.cambiarEstadoBoletin(edificio.id, estado)
                                                }}>{edificio.estado === true ? "Activo" : "Inactivo"}</label>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                (
                                    <div className="d-flex align-items-center">
                                        <strong>Loading...</strong>
                                    </div>
                                )
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
};

export default BoletinActivoTable;