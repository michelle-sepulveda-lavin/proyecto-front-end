import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const BoletinTable = (props) => {
    // console.log(props.boletin)

    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //     getBoletines()
    // }, [])




    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th onClick={() => console.log(actions)}>Asunto</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        store.all_boletin.length > 0 ?
                            store.all_boletin.map((edificio, index) => (
                                <tr key={edificio.edificio_id}>
                                    <td>{edificio.asunto}</td>
                                    <td>{edificio.body}</td>
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
        </>
    )
};

export default BoletinTable;