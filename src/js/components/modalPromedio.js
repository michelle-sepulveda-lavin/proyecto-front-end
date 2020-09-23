import React, { useContext } from "react";
import { Context } from "../store/appContext";


const ModalPromedio = props => {
    const { actions, store } = useContext(Context)

    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.promedioMonto ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>

                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => { props.setPromedioMonto(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body text-center">
                        <p>Monto total ingresado: {props.monto}</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"

                            onClick={() => { props.setPromedioMonto(false) }}
                        >
                            Atrás
						</button>
                        <button
                            type="button"
                            className="btn btn-success"
                            data-dismiss="modal"
                        >
                            Borrar
						</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ModalPromedio;