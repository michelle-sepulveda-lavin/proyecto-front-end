
import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import PDFView from './PDF';


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
                        {!!props.datos.pago && props.show &&
                            < PDFView url={`${store.apiURL}/pagosgastos/${props.datos.pago}`}> </PDFView>}
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <div className="d-flex justify-content-center">
                            <div>
                                <button
                                    className="btn btn-danger mr-2"
                                    onClick={() => {
                                        actions.cambiarEstadoGastoComun(props.datos.idDepto, props.datos.month, props.datos.year, "noPagado", props.setData, props.setData2)

                                        props.setShow(false)
                                        actions.getGastosDeptoActual(props.deptoSeleccionado, props.setData)
                                        actions.getGastosDeptoActual(props.deptoSeleccionado, props.setData).then(response => { props.setData2(response) })
                                    }}
                                >
                                    Rechazar
						            </button>
                            </div>
                            <div>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        actions.cambiarEstadoGastoComun(props.datos.idDepto, props.datos.month, props.datos.year, "pagado", props.setData, props.setData2)
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


