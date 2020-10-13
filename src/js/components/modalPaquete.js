import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalPaquete = () => {
    const { store, actions } = useContext(Context);
    const [info, setInfo] = useState();
    const [bandera, setBandera] = useState(false)

    const handleInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const limpiarFormulario = (e) => {
        e.target.reset()
    }

    return (
        <>
            <div className="modal fade" id="modalPaquete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {
                            !bandera ?
                                <div className="row" className="mt-3">
                                    <div className="col">
                                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                                            <h4 className="alert-heading">Recordatorio</h4>
                                            <p>Si el paquete es de tipo comida, intentar contactar al departamento via citofono como primera opción</p>
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setBandera(true)}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Notificacion Paquete</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form
                                            onSubmit={(e) => {
                                                actions.handlePaqueteria(e, info)
                                                limpiarFormulario(e)
                                                setInfo()

                                            }}>
                                            <div className="form-group">
                                                <label htmlFor="numero_departamento">N° Departamento</label>
                                                <input type="number" className="form-control" name="numero_departamento" onChange={(e) => handleInfo(e)} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="descripcion">Descripción del paquete</label>
                                                <input type="text" className="form-control" name="descripcion" onChange={(e) => handleInfo(e)} />
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-verde">Enviar notificacion</button>
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                            </div>
                                        </form>
                                    </div>
                                </>

                        }

                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalPaquete;