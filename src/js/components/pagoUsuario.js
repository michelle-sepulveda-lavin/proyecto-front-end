
import React, { useContext } from 'react';
import { Context } from '../store/appContext';


const PagoUsuario = props => {
    const { store, actions } = useContext(Context)

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
                        {!!props.pago &&
                            < iframe src={`${store.apiURL}/pagosgastos/${props.pago}`} width="100%" height="auto" className="modal-lg"> </iframe>}
                        {!props.pago &&
                            <h3 className="text-center mt-5 pt-5">No existe registro de este comprobante</h3>
                        }
                    </div>

                </div>
            </div>
        </div >
    )
};

export default PagoUsuario;


