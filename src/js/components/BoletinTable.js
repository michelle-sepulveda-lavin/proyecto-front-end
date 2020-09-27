import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const BoletinTable = (props) => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getBoletines()
    }, [])




    return (
        <>
            <div className="row container mt-4">
                <table className="table table-hover col-10 mx-auto  overflow-auto ">
                    <thead className="thead-dark text-center">
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
                                store.all_boletin.map((edificio, index) => (
                                    <tr key={edificio.edificio_id} >
                                        <th scope="row">{edificio.id}</th>
                                        <td className="text-center">{edificio.asunto}</td>
                                        <td className="text-break w-50"><p>{edificio.body}</p></td>
                                        <td>
                                            <div className="custom-control custom-switch">
                                                <input type="checkbox" className="custom-control-input" id={"customSwitch" + index} />
                                                <label className="custom-control-label" htmlFor={"customSwitch" + index}>Activo</label>
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

export default BoletinTable;