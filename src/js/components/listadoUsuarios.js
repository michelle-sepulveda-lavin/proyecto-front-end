import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import ModalEditUser from './modalEditUser';

const ListadoUsuarios = () => {
    const { actions, store } = useContext(Context);

    return (
        <>
            <div className="row my-5">
                <div className="col">
                    <form onSubmit={e => actions.getUsuarios(e)} >
                        <div className="form-row text-center ">
                            <div className="col-md-2">
                                <label htmlFor="rol_id text-center">Filtro busqueda</label>
                            </div>
                            <div className="col-md-4 ">
                                <select defaultValue={''} name="rol_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                    <option value="" >Todos</option>
                                    <option value="superAdministrador">Super Administradores</option>
                                    <option value="administrador">Administradores</option>
                                    <option value="conserje">Conserje</option>
                                    <option value="usuario">Usuarios</option>
                                </select>
                            </div>
                            <div className="col-md-6 ">
                                <button className="btn btn-success">Mostrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <table className="table table-hover text-center table-bordered border">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">N°</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Edificio</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
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
                                            <td>{!!usuario.edificio? usuario.edificio.name : usuario.edificio.id}</td>
                                            <td>
                                                <button type="button" className="btn " data-toggle="modal" data-target="#modalEditUser"
                                                    onClick={() => {
                                                        actions.guardarIndex(i)
                                                        actions.resetMsg()
                                                        actions.activarModalEdit()
                                                    }}>
                                                    <i className="fas fa-pencil-alt cursor-pointer"></i>
                                                </button>
                                                <ModalEditUser />
                                            </td>
                                            <td><i className="fas fa-trash-alt btn" onClick={e => actions.deleteUsuarios(e, i)}></i></td>
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