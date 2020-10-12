
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const ModalCrearConserje = props => {
    const { store, actions } = useContext(Context);

    const [state, setState] = useState({

    })
    useEffect(() => {
        actions.getRoles()
    }, [])
    const handleInputConserje = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const limpiarFormulario = (e) => {
        e.target.reset()
    }
    const handleAvatar = (e) => {
        const file = e.target.files[0]
        setState({
            ...state, [e.target.id]: file
        })
    }

    return (
        <div className="modal modal-dialog-scrollable overflowy-auto" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-body">

                        <div className=" py-2">

                            {
                                store.crearConserje.error &&
                                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>Error: </strong>{" "}
                                    {store.crearConserje.error}
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            }
                            <form className="col-12  m-auto border shadow pt-3" onSubmit={(e) => {
                                actions.crearConserje(e, state)
                                if (store.crearConserje.error === null) {
                                    limpiarFormulario(e)
                                    setState({})
                                }

                            }}>

                                <span aria-hidden="true" className="btn float-right" onClick={() => {
                                    props.setShow(false)
                                }}>&times;</span>
                                <div className="form-group">
                                    <label htmlFor="avatar">Foto de Perfil</label>
                                    <input className="form-control-file" type="file" id="avatar" accept="image/*" onChange={handleAvatar} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nombre_conserje">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" onChange={handleInputConserje} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input type="number" className="form-control" id="telefono" onChange={handleInputConserje} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="turno">Turno</label>
                                    <select className="form-control" defaultValue={'default'} id="turno" onChange={handleInputConserje}>
                                        <option value="default" disabled>Seleccionar</option>
                                        <option>Mañana</option>
                                        <option>Tarde</option>
                                        <option>Noche</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usuario">Usuario</label>
                                    <input type="text" className="form-control" id="username" onChange={handleInputConserje} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usuario">Correo</label>
                                    <input type="text" className="form-control" id="email" onChange={handleInputConserje} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contraseña">Contraseña</label>
                                    <input type="text" className="form-control" id="password" onChange={handleInputConserje} />
                                </div>
                                <button className="btn btn-verde mb-3">Crear conserje</button>
                            </form>
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
            </div>
        </div>
    )
};

export default ModalCrearConserje;


