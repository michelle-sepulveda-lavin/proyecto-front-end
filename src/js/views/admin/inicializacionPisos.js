import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../store/appContext';
import ModalCreacionUser from '../../components/modalCreacionUser'
import ModalAddUser from '../../components/modalAddUser';

const InicializacionPisos = () => {
    const { store, actions } = useContext(Context);
    const [pisos, setPisos] = useState([]);
    const [info, setInfo] = useState({});

    const contadorPisos = () => {
        const auxiliar = store.departamentoUsuarios.map((dpto) => {
            return dpto.piso
        })
        const aux2 = [...new Set(auxiliar)]
        setPisos(aux2)
    }

    const handleChange = (e) => {
        setInfo({
            ...info, [e.target.name]: e.target.value
        })
    };
    const limpiarFormulario = (e) => {
        e.target.reset()
    };
    const limpiarState = () => {
        setInfo({})
    };

    const sumaUnidades = () => {
        const auxiliar = store.departamentoUsuarios.map((dpto) => {
            return dpto.piso
        })
        const aux2 = [...new Set(auxiliar)]
        return (aux2).length
    }
    const sumaBodegas = () => {
        const auxiliar = store.departamentoUsuarios.filter((dpto) => {
            return dpto.bodega_id != null
        })
        const aux2 = [...new Set(auxiliar)]
        return (aux2).length
    }
    const sumaEstacionamientos = () => {
        const auxiliar = store.departamentoUsuarios.filter((dpto) => {
            return dpto.estacionamiento_id != null
        })
        const aux2 = [...new Set(auxiliar)]
        return (aux2).length
    }

    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getDepartamentos()
        actions.getDptosUsuarios()
        actions.getUsuariosDelEdificio()
        actions.usuariosNoAsignados()
        actions.getBodegasDelEdificio()
        actions.getEstacionamientosDelEdificio()

    }, []);
    return (
        <>
            {
                !!store.departamentos &&
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 m-auto">
                                <h1>Inicializacion de los Piso</h1>
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col-md-6 border">
                                <p>Pisos totales {!!store.edificioCompleto && store.edificioCompleto.numero_pisos}</p>
                                <p>Departamentos totales {!!store.edificioCompleto && store.edificioCompleto.numero_departamentos}</p>
                                <p>Bodegas totales {!!store.edificioCompleto && store.edificioCompleto.total_bodegas}</p>
                                <p>Estacionamiento totales {!!store.edificioCompleto && store.edificioCompleto.total_estacionamientos}</p>
                            </div>
                            <div className="col-md-6 border">
                                <p>Pisos inicializados: {!!pisos && sumaUnidades()}</p>
                                <p>Departamentos Creados: {!!store.contadorUsuarios && (store.contadorUsuarios)}</p>
                                <p>Bodegas asignadas {!!store.departamentoUsuarios && sumaBodegas()}</p>
                                <p>Estacionamiento asignados {sumaEstacionamientos()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="container my-5 d-flex justify-content-center">
                        <div className="row ">
                            <div className="col">
                                <button type="button" className="btn btn-success" data-toggle="modal" data-target="#modalCreacionUser"
                                    onClick={() => {
                                        actions.activarModal()
                                        actions.resetMsg()
                                    }} >
                                    Crear Usuario
                                </button>
                                <ModalCreacionUser />
                            </div>
                        </div>
                    </div>

                    {
                        !!store.edificioCompleto &&
                            store.contadorUsuarios === store.edificioCompleto.numero_departamentos ?
                            <p></p>
                            :

                            <div className="container mt-5">
                                <form onSubmit={(e) => {
                                    actions.postDptoUsuario(e, info)
                                    limpiarFormulario(e)
                                    limpiarState()
                                }}>
                                    <table className="table table-bordered table-responsive-md">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">N° Departamento</th>
                                                <th scope="col">Residente</th>
                                                <th scope="col">N° Bodega</th>
                                                <th scope="col">N° Estacionamiento</th>
                                                <th scope="col">N° Piso</th>
                                                <th scope="col">Estado</th>
                                                <th scope="col">Edificio</th>
                                                <th scope="col">Modelo</th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><label className="sr-only" htmlFor="numero_departamento">N° Departamento</label>
                                                    <input type="text" className="form-control mb-2 mr-sm-2" name="numero_departamento" onChange={e => handleChange(e)} /></td>
                                                <td>

                                                    {
                                                        !!store.usuariosEdificioNoAsignados ?
                                                            <>
                                                                <label className="sr-only" htmlFor="residente">Residente</label>
                                                                <select defaultValue={'null'} className="form-control form-control-sm" name="residente" onChange={e => handleChange(e)}>
                                                                    <option value="null" disabled>Seleccionar</option>
                                                                    {
                                                                        !!store.usuariosEdificioNoAsignados &&
                                                                        store.usuariosEdificioNoAsignados.map((user, index) => {
                                                                            return (
                                                                                user.rol.name === "usuario" &&
                                                                                <option value={user.id} key={index}>{user.username}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </>
                                                            :
                                                            <>
                                                                <label className="sr-only" htmlFor="residente">Residente</label>
                                                                <input type="text" className="form-control mb-2 mr-sm-2" name="residente" disabled />
                                                            </>
                                                    }

                                                </td>
                                                <td>
                                                    {
                                                        !!store.edificioCompleto &&
                                                            sumaBodegas() === store.edificioCompleto.total_bodegas ?
                                                            <>
                                                                <label className="sr-only" htmlFor="bodega_id">Bodega</label>
                                                                <input type="number" className="form-control mb-2 mr-sm-2" name="bodega_id" disabled />
                                                            </>

                                                            :

                                                            <>
                                                                <label className="sr-only" htmlFor="bodega_id">Bodega</label>
                                                                <input type="number" className="form-control mb-2 mr-sm-2" name="bodega_id" defaultValue="0" onChange={e => handleChange(e)} />
                                                            </>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        !!store.edificioCompleto &&
                                                            sumaEstacionamientos() === store.edificioCompleto.total_estacionamientos ?
                                                            <>
                                                                <label className="sr-only" htmlFor="estacionamiento_id">Estacionamiento</label>
                                                                <input type="number" className="form-control mb-2 mr-sm-2" name="estacionamiento_id" disabled />
                                                            </>
                                                            :
                                                            <>
                                                                <label className="sr-only" htmlFor="estacionamiento_id">Estacionamiento</label>
                                                                <input type="number" className="form-control mb-2 mr-sm-2" name="estacionamiento_id" defaultValue="0" onChange={e => handleChange(e)} />
                                                            </>

                                                    }
                                                </td>
                                                <td><label className="sr-only" htmlFor="piso">Piso</label>
                                                    <input type="text" className="form-control mb-2 mr-sm-2" name="piso" onChange={e => handleChange(e)} /></td>
                                                <td><label className="sr-only" htmlFor="estado">Estado</label>
                                                    <select defaultValue={'default'} className="form-control form-control-sm" name="estado" onChange={e => handleChange(e)}>
                                                        <option value="default" disabled></option>
                                                        <option value="habitado">Habitado</option>
                                                        <option value="deshabitado">Deshabitado</option>
                                                    </select>
                                                </td>
                                                <td><label className="sr-only" htmlFor="edificio_id">Edificio</label>
                                                    <input type="text" className="form-control mb-2 mr-sm-2" name="edificio_id" readOnly value={!!store.edificioCompleto && store.edificioCompleto.nombre_edificio} onChange={e => handleChange(e)} /></td>
                                                <td><label className="sr-only" htmlFor="modelo_id">Modelo</label>
                                                    <select defaultValue={'default'} className="form-control form-control-sm" name="modelo_id" onChange={e => handleChange(e)}>
                                                        <option value="default" disabled></option>
                                                        {
                                                            !!store.departamentos && store.departamentos.map((dpto, index) => {
                                                                return (
                                                                    <option key={index} value={dpto.modelo}>{dpto.modelo}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </td>
                                                <td><button className="btn btn-primary mb-2">Añadir</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                    }

                    <div className="container my-5">
                        <div className="row">
                            <div className="col">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => contadorPisos()}>
                                        Piso
                            </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" onClick={() => actions.filtradoPiso("todos")}>
                                            Todos
                                </a>
                                        {
                                            !!pisos &&
                                            pisos.sort(function(a, b){return a - b}).map((piso, index) => {
                                                return (
                                                    <a className="dropdown-item" key={index} onClick={() => actions.filtradoPiso(piso)}>
                                                        {piso}
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h5>Departamentos Creados</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <table className="table table-bordered table-responsive-md">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">N° Departamento</th>
                                            <th scope="col">Residente</th>
                                            <th scope="col">N° Bodega</th>
                                            <th scope="col">N° Estacionamiento</th>
                                            <th scope="col">Piso</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Edificio</th>
                                            <th scope="col">Modelo</th>
                                            <th scope="col">Eliminar</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store.departamentosPorPiso.length > 0 ?
                                                (store.departamentosPorPiso.sort(function(a, b){return a - b}).map((dpto, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{dpto.numero_departamento}</td>
                                                            <td className="text-center">{dpto.residente.name}</td>
                                                            <td>{dpto.bodega_id}</td>
                                                            <td>{dpto.estacionamiento_id}</td>
                                                            <td>{dpto.piso}</td>
                                                            <td>{dpto.estado}</td>
                                                            <td>{dpto.edificio.name}</td>
                                                            <td>{dpto.modelo.name}</td>
                                                            <td>
                                                                <i className="fas fa-trash-alt btn" onClick={() => {
                                                                    actions.deleteUsuarioDpto(index)
                                                                }}></i>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addUser" onClick={() => actions.dptoModificar(dpto.id)}>
                                                                    <i className="fas fa-pencil-alt cursor-pointer"></i>
                                                                </button>
                                                                <ModalAddUser />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                )
                                                :
                                                (store.departamentoUsuarios.map((dpto, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{dpto.numero_departamento}</td>
                                                            <td className="text-center">{dpto.residente.name}</td>
                                                            <td>{dpto.bodega_id}</td>
                                                            <td>{dpto.estacionamiento_id}</td>
                                                            <td>{dpto.piso}</td>
                                                            <td>{dpto.estado}</td>
                                                            <td>{dpto.edificio.name}</td>
                                                            <td>{dpto.modelo.name}</td>
                                                            <td>
                                                                <i className="fas fa-trash-alt btn" onClick={() => {
                                                                    actions.deleteUsuarioDpto(index)
                                                                }}></i>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addUser" onClick={() => actions.dptoModificar(dpto.id)}>
                                                                    <i className="fas fa-pencil-alt cursor-pointer"></i>
                                                                </button>
                                                                <ModalAddUser />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                                )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
            <div className="row my-5">
                <div className="col-md-3 m-auto">
                    <Link to="/admin/departamentos" style={{ textDecoration: 'none' }}>
                        <span className="boton-a-inicio shadow">
                            <i className="fas fa-arrow-circle-left"></i> Ir atras
                    </span>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default InicializacionPisos;