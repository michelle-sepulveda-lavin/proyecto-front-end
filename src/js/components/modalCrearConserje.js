
import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const ModalCrearConserje = props => {
    const { store, actions } = useContext(Context);
    const limpiarFormulario = (e) => {
        e.target.reset()
    }

    return (
        <>
            <div

            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="">Nuevo Conserje</h5>
                        </div>
                        <div className="modal-body">

                            <div className="container mt-4 py-4">
                                <form className="col-12 col-md-6 m-auto border shadow py-5" >
                                    <div className="form-group">
                                        <label htmlFor="avatar_conserje">Foto de Perfil</label>
                                        <input className="form-control-file" type="file" name="avatar_conserje" accept="image/*" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombre_conserje">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefono">Teléfono</label>
                                        <input type="number" className="form-control" id="telefono" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="turno">Turno</label>
                                        <select className="form-control" defaultValue={'default'}>
                                            <option value="default" disabled>Seleccionar</option>
                                            <option>Mañana</option>
                                            <option>Tarde</option>
                                            <option>Noche</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="usuario">Usuario</label>
                                        <input type="text" className="form-control" id="usuario" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contraseña">Contraseña</label>
                                        <input type="text" className="form-control" id="contraseña" />
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ModalCrearConserje;
