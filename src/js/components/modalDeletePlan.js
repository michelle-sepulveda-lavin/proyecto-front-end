import React, { useContext } from "react";
import { Context } from "../store/appContext";


const ModalDeletePlan = props => {
    const { actions, store } = useContext(Context)
    const deletePlan = async () => {
        const response = await fetch(`${store.apiURL}/api/planes/${props.id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        props.getData()
        actions.getPlanes()
        props.close()
    }
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
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={props.close}
                        >
                            Atrás
						</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                            onClick={deletePlan}
                        >
                            Borrar
						</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDeletePlan;