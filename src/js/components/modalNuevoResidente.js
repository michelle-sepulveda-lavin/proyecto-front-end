import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const ModalNuevoResidente = () => {
    /* const [info, setInfo] = useState() */
    const { actions, store } = useContext(Context);

/*     const handleInfo = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    } */
    return (
        <>
            <div className="modal fade" id="nuevoResidente" tabIndex="-1" aria-labelledby="nuevoResidente" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="nuevoResidente">Nuevo residente</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <small>-Solicitud para agregar un nuevo residente al edificio(para un departamento en particular)</small>
                            <small>-Solo se debe registrar un residente por departamento</small>
                        </div>
                        {
                            !!store.errorNuevoResidente &&
                            <div className="alert alert-warning" role="alert">
                                {store.errorNuevoResidente}
                            </div>
                        }

                        <div className="modal-body">
                            <form onSubmit={(e) => actions.handleNuevoResidente(e)}>
                                <div className="form-group">
                                    <label htmlFor="username">Nombre Completo</label>
                                    <input type="text" className="form-control" name="username" value={store.username} onChange={(e) => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" value={store.email} onChange={(e) => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="numero_dpto">Numero Departamento</label>
                                    <input type="number" className="form-control" name="numero_dpto" value={store.numero_dpto} onChange={(e) => actions.handleChangeLogin(e)} />
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-verde">Solicitar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalNuevoResidente;