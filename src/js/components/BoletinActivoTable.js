import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const BoletinActivoTable = (props) => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getBoletines()
    }, [])

    const filtroBoletin = () => {
        const activos = store.all_boletin.filter((boletin) => {
            return boletin.estado === true
        })
        return activos
    }


    return (
        <>
            <div className="row container mt-4 overflow-auto">
                <table className="table table-bordered border col-10 mx-auto  overflow-auto ">
                    <thead className="btn-oscuro text-center">
                        <tr>
                            <th>ID</th>
                            <th>Asunto</th>
                            <th>Cuerpo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className=" boletines">
                        {
                            store.all_boletin.length > 0 ?
                                filtroBoletin().map((edificio, index) => (
                                    <tr key={edificio.edificio_id} >
                                        <th scope="row">{edificio.id}</th>
                                        <td className="text-center">{edificio.asunto}</td>
                                        <td className="text-break pt-0"><p>{edificio.body}</p></td>
                                        <td className="">
                                            <div className="mt-4 pb-0">
                                                <div className="custom-control custom-switch mb-3 d-flex justify-content-center">
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
                                                <div>
                                                    <span className="btn btn-azul" onClick={() => {
                                                        props.usuarios.map((usuario) => {
                                                            if (!!usuario.email) {
                                                                actions.correoBoletines(usuario.id, edificio.asunto, edificio.body, usuario.edificio.name)
                                                            }
                                                        })
                                                        alert("Correo enviado")
                                                    }
                                                    }>Notificar por correo</span>
                                                </div>
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