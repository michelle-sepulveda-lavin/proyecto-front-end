import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";


const ModalDeleteEdificio = props => {
    const deleteEdificio = async () => {
        const response = await fetch(`http://127.0.0.1:5000/crearedificio/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        actions.getEdificiosData()
        setCustomAlert("borrado")
        setTimeout(() => {
            history.push("/listado-edificios")
        }, 1500);

    }
    const { actions } = useContext(Context)
    const history = useHistory()
    const [customAlert, setCustomAlert] = useState("")
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>

                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={props.close}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <p>Advertencia: esta acción será permanente</p>
                        <div className={"alert alert-danger " + (customAlert === "borrado" ? "d-block" : "d-none")} role="alert">
                            El edificio fue borrado
                                                            </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={props.close}
                        >
                            Cancelar
						</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={deleteEdificio}
                        >
                            Borrar
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDeleteEdificio;