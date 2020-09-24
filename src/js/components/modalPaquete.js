import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalPaquete = () => {
    const { store, actions } = useContext(Context);
    const [numeroDpto, setNumeroDpto] = useState();

    const handleNumero = (e) => {
        setNumeroDpto({
            [e.target.name]: e.target.value
        })
    }
    const limpiarFormulario = (e) =>{
        e.target.reset()
    }

    return (
        <>
            <div className="modal fade" id="modalPaquete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Notificacion Paquete</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form
                                onSubmit={(e) => {
                                    actions.handlePaqueteria(e, numeroDpto)
                                    limpiarFormulario(e)
                                    setNumeroDpto()
                                    
                                }}>
                                <div className="form-group">
                                    <label htmlFor="numero_departamento">N° Departamento</label>
                                    <input type="number" className="form-control" name="numero_departamento" onChange={(e) => handleNumero(e)} />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary">Enviar notificacion</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalPaquete;