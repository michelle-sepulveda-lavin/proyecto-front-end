import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const ListadoUsuarios = () => {
    const { actions, store } = useContext(Context)
    return (
        <>
            <div className="row my-5">
                <div className="col">
                    <form onSubmit={e => actions.getUsuarios(e)} >
                        <div className="form-group text-center">
                            <label htmlFor="rol_id m-2">Filtro busqueda</label>
                            <select  defaultValue={'default'} name="rol_id" className="form-control m-auto col-md-6 " onChange={e => actions.handleChangeLogin(e)}>
                                <option value="default" disabled>Seleccionar</option>
                                <option value="superAdministrador">Super Administradores</option>
                                <option value="administrador">Administradores</option>
                                <option value="conserje">Conserje</option>
                                <option value="usuario">Usuarios</option>
                            </select>
                            <button className="btn btn-success m-2">Mostrar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <table className="table table-bordered table-responsive-md">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                store.allUsuarios !== [] &&
                                store.allUsuarios.map((usuario, i) => {
                                    return (
                                        <tr key={i}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.rol.name}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
};

export default ListadoUsuarios;