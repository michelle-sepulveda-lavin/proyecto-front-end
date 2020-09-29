
import React, { useContext } from 'react';
import { Context } from '../store/appContext';


const ModalComprobante = props => {
    const { store } = useContext(Context)

    return (

        <div className="modal modal-dialog-scrollable overflowy-auto" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">

                <div className="modal-content bg-modal modal-lg2">
                    <div>
                        <button type="button" className="close float-right mr-4" onClick={() => props.setShow(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {
                            store.montosTotalesMes.length > 0 && props.comprobante !== "" &&
                            < iframe src={`${store.apiURL}/comprobantes/${props.comprobante}`} width="100%" height="auto" className="modal-lg"> </iframe>
                        }
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                props.setShow(false)
                            }}
                        >
                            Atrás
						</button>

                    </div>


                </div>
            </div>
        </div >
    )
};

export default ModalComprobante;


