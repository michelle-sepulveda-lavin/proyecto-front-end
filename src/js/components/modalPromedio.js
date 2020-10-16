import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";


const ModalPromedio = props => {
    const { actions, store } = useContext(Context)
    const history = useHistory()
    useEffect(() => {
        actions.getDptosUsuarios()
        actions.getBodegasDelEdificio()
        actions.getEstacionamientosDelEdificio()
        actions.getDepartamentos()
        actions.getDptosUsuarios()
        actions.getEdificioCompleto()
    }, [])
    const gastoCLP = (numero) => {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'CLP' }
        ).format(numero)
    }
    return (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: props.showModal ? "inline-block" : "none" }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content btn-oscuro text-light modal-lg">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>

                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => { props.setshowModal(false) }}>
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body text-center pt-5">


                        {
                            store.crearGastoComun.error &&
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>Mensaje: </strong>{" "}
                                {store.crearGastoComun.error}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }

                        {
                            store.crearGastoComun.success &&
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Mensaje: </strong>{" "}
                                {store.crearGastoComun.success}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        }


                        <p className="border shadow p-2 bg-white text-body">Monto total ingresado: {gastoCLP(props.monto)}</p>
                        <p className="border shadow p-2 bg-white text-body">Promedio por departamento: {gastoCLP(props.promedioMonto)}</p>
                        <p className="mt-4">Una vez ingresados los gastos comunes no podrán ser modificados</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"

                            onClick={() => { props.setshowModal(false) }}
                        >
                            Atrás
						</button>
                        <button
                            type="button"
                            className="btn btn-verde"
                            data-dismiss="modal"
                            onClick={() => {
                                store.departamentoUsuarios.map((depa) => { actions.calculoPorcentajeGastoComunDepto(depa, props.monto, depa.id, props.comprobante, history) })
                                if (!!store.crearGastoComun.error) {
                                    console.log(store.crearGastoComun.error)
                                }
                            }

                            }
                        >
                            Calcular
						</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ModalPromedio;