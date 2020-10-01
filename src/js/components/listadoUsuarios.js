import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import ModalEditUser from './modalEditUser';

const ListadoUsuarios = () => {
    const { actions, store } = useContext(Context);

    return (
        <>
            <div className="row my-5">
                <form onSubmit={e => actions.getUsuarios(e)} className="col d-flex justify-content-center">
                    <div className="form-row ">
                        <div className="col-md-4">
                                <label htmlFor="rol_id text-center">Ordenar por</label>
                        </div>
                        <div className="col-md-4 ">
                            <select defaultValue={''} name="rol_id" className="form-control" onChange={e => actions.handleChangeLogin(e)}>
                                <option value="" >Todos</option>
                                <option value="superAdministrador">Super Administradores</option>
                                <option value="administrador">Administradores</option>
                                <option value="conserje">Conserje</option>
                                <option value="usuario">Usuarios</option>
                                <option value="propietario">Propietario</option>
                            </select>
                        </div>
                        <div className="col-md-4 ">
                            <button className="btn btn-verde"><i className="fas fa-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="row mt-5">
                <div className="col overflow-auto">
                    <table className="table text-center table-bordered border">
                        <thead className="btn-oscuro">
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
                                            <td>{!!usuario.edificio ? usuario.edificio.name : usuario.edificio.id}</td>
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