import React from 'react';
import { useForm } from 'react-hook-form'

const AddBoletin = (props) => {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        console.log(data)

        props.addboletin(data)
        e.target.reset();
    }


    return (
        <>
            <div className="container">

                <div className="row">
                    <div className="col-sm-8"></div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Crear Boletin</button>
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

                            <form onSubmit={(e) => { handleSubmit(e) }}>
                                <div className="form-group">
                                    <label htmlFor="recipient-name" className="col-form-label">Asunto:</label>
                                    <input type="text" className="form-control" id="recipient-name" name="asunto" ref={
                                        register({
                                            required: {
                                                value: true,
                                                message: 'Campo Requerido'
                                            }
                                        })
                                    } />
                                </div>
                                <div>
                                    {errors?.asunto?.message}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text" name="body" ref={
                                        register({
                                            required: {
                                                value: true,
                                                message: 'Campo Requerido'
                                            }
                                        })
                                    } ></textarea>

                                    <div>
                                        {errors?.body?.message}
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary">Guardar</button>

                        </div>
                    </div>
                </div>
            </div>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <label>Asunto</label>
                <input type="text" name="asunto" ref={
                    register({
                        required: {
                            value: true,
                            message: 'Campo Requerido'
                        }
                    })
                } />
                <div>
                    {errors?.asunto?.message}
                </div>
                <label>Body</label>
                <input type="text" name="body" ref={
                    register({
                        required: {
                            value: true,
                            message: 'Campo Requerido'
                        }
                    })
                } />
                <div>
                    {errors?.body?.message}
                </div>
                <button>Agregar nuevo Boletin</button>
            </form> */}

        </>
    )
};

export default AddBoletin;