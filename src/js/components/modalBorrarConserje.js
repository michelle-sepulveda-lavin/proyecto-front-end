import React, { useContext } from "react";
import { Context } from "../store/appContext";


const BorrarConserje = props => {
    const { actions, store } = useContext(Context)
    const deleteConserje = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio
        const response = await fetch(`${store.apiURL}/conserjes/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        actions.getConserjes(edificioID)
        props.setBorrar(false)
    }
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.borrar ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>

                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => { props.setBorrar(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <p>Advertencia: esta acción será permanente</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => { props.setBorrar(false) }}
                        >
                            Atrás
						</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={() => {
                                deleteConserje(props.id)
                            }}
                        >
                            Borrar
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrarConserje;