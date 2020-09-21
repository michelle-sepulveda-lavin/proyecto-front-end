import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import ModalEditUser from './modalEditUser';

const ListadoUsuarios = () => {
    const { actions, store } = useContext(Context);


    return (
        <>
            <div className="row my-5">
                <div className="col">
                    <form onSubmit={e => actions.getUsuarios(e)} >
                        <div className="form-group text-center">
                            <label htmlFor="rol_id m-2">Filtro busqueda</label>
                            <select defaultValue={'default'} name="rol_id" className="form-control m-auto col-md-6 " onChange={e => actions.handleChangeLogin(e)}>
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
                                            <td>{usuario.edificio}</td>
                                            <td>
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalEditUser" 
                                                onClick={()=>{
                                                    actions.guardarIndex(i)
                                                    actions.resetMsg()
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