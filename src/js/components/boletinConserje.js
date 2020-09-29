import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const BoletinConserje = (props) => {

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
                <table className="table table-hover col-10 mx-auto  overflow-auto ">
                    <thead className="thead-dark text-center">
                        <tr>
                            <th>ID</th>
                            <th>Asunto</th>
                            <th>Body</th>

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

export default BoletinConserje;