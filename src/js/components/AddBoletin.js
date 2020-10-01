import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

const AddBoletin = (props) => {

    const { store, actions } = useContext(Context);



    return (
        <>
            <div className="container">

                <div className="row">
                    <div className="col-sm-8"></div>
                    <div className="col-sm-4 d-flex justify-content-center">
                        <button type="button" className="btn btn-azul mb-4" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Crear Boletin</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Agregar Boletin</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <form onSubmit={(e) => { actions.handleSubmitBoletin(e) }}>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Asunto:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="asunto_boletin" onChange={(e) => actions.captureData(e)} value={store.asunto_boletin} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text" name="body_boletin" onChange={(e) => actions.captureData(e)} value={store.body_boletin}></textarea>


                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    <button className="btn btn-azul">Crear</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
};

export default AddBoletin;