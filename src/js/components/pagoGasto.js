
import React, { useContext } from 'react';
import { Context } from '../store/appContext';


const PagoGastos = props => {
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
                        {!!props.datos.pago &&
                            < iframe src={`${store.apiURL}/pagosgastos/${props.datos.pago}`} width="100%" height="auto" className="modal-lg"> </iframe>}
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                            <div>
                                <button
                                    className="btn btn-danger mr-2"
                                    onClick={() => {
                                        actions.cambiarEstadoGastoComun(props.datos.idDepto, props.datos.month, props.datos.year, "noPagado", props.setData)
                                        props.setShow(false)
                                        actions.getGastosDeptoActual(props.deptoSeleccionado, props.setData)
                                    }}
                                >
                                    Rechazar
						            </button>
                            </div>
                            <div>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        actions.cambiarEstadoGastoComun(props.datos.idDepto, props.datos.month, props.datos.year, "pagado", props.setData)
                                        props.setShow(false)
                                        actions.getGastosDeptoActual(props.deptoSeleccionado, props.setData)
                                    }}
                                >
                                    Aprobar Pago
						            </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div >
    )
};

export default PagoGastos;


