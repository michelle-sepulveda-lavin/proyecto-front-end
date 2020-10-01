import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const DepartamentosAdmin = () => {
    const { store, actions } = useContext(Context);
    const [pisos, setPisos] = useState([]);
    const [numero, setNumero] = useState()

    const contadorPisos = () => {
        const auxiliar = store.departamentoUsuarios.map((dpto) => {
            return dpto.piso
        })
        const aux2 = [...new Set(auxiliar)]
        setPisos(aux2)
    }


    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getDepartamentos()
        actions.getDptosUsuarios()
        actions.getUsuariosDelEdificio()
        actions.getBodegasDelEdificio()
        actions.getEstacionamientosDelEdificio()
        actions.propietarioNoAsignado()

    }, [])
    return (
        <SidebarPage>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1>Departamentos</h1>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-center mt-5">
                <div className="row" style={{ width: "30vw" }}>
                    <div className="col-md-6">
                        <div className="row">
                            <Link className="col" to="/admin/inicializacion-dptos" style={{ textDecoration: 'none' }} >
                                <i className="fas fa-hammer fa-boxes fa-2x p-3 rounded-circle border btn-oscuro"></i>
                                <span className="text-dark">Modelos</span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <Link className="col " to="/admin/inicializacion-pisos" style={{ textDecoration: 'none' }}>
                                <i className="far fa-building fa-boxes fa-2x p-3 rounded-circle btn-oscuro"></i>
                                <span className="text-dark">Editar/Crear</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container border bg-white mt-5 p-3" style={{ width: "50vw" }}>
                <div className="row">
                    <div className="col m-1">
                        <div className="btn-group btn-block">
                            <button type="button" className="btn btn-azul dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => {
                                contadorPisos()
                            }
                            }>
                                Piso
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => { actions.filtradoDepartamentos("todos") }}>
                                    Todos
                                </a>
                                {
                                    !!pisos &&
                                    pisos.sort(function (a, b) { return a - b }).map((piso, index) => {
                                        return (
                                            <a className="dropdown-item" key={index} onClick={() => { actions.filtradoDepartamentos(piso) }}>
                                                {piso}
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col m-1">
                        <div className="btn-group btn-block">
                            <button type="button" className="btn btn-azul dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Estado
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" onClick={() => actions.filtradoDepartamentos("habitado")}>
                                    Habitado
                                </a>
                                <a className="dropdown-item" onClick={() => actions.filtradoDepartamentos("deshabitado")}>
                                    Deshabitado
                                </a>
                                <a className="dropdown-item" onClick={() => actions.filtradoDepartamentos("todos")}>
                                    Todos
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col m-1">
                        <div className="row">
                            <div className="col-md-8">
                                <label htmlFor="numero_departamento" className="sr-only">Numero Departamento</label>
                                <input type="number" className="form-control" name="numero_departamento" onChange={e => setNumero({dpto: e.target.value})} />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-azul" onClick={(e) => {
                                    actions.filtradoDepartamentos(numero)
                                }}><i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    {
                        !!store.departamentosFiltrados &&
                        store.departamentosFiltrados.sort(function (a, b) {
                            if (a.numero_departamento > b.numero_departamento) {
                              return 1;
                            }
                            if (a.numero_departamento < b.numero_departamento) {
                              return -1;
                            }
                            // a must be equal to b
                            return 0;
                          }).map((dpto, index) => {
                            const residente = !!dpto.residente && dpto.residente;
                            const propietario = !!dpto.propietario && dpto.propietario;
                            const resultado = !!store.finalUserBuilding && store.finalUserBuilding.find(elem => elem.id == residente);
                            const resultado2 = !!store.usuariosEdificio && store.usuariosEdificio.find(elem => elem.id == propietario);
                            return (
                                <div className="col-md-4" key={index}>
                                    <div className="card btn-oscuro mb-3" style={{ maxWidth: "18rem" }}>
                                        <div className="card-header d-flex justify-content-between">
                                            <p style={{ fontSize: "2em" }}>
                                                {dpto.numero_departamento}
                                            </p>
                                            <p className="card-text">{dpto.estado}</p>
                                        </div>
                                        <div className="card-body bg-white text-dark">
                                            <p className="card-text font-weight-bold border-bottom">Residente: <span className="font-weight-normal text-capitalize">{!!resultado && resultado.username}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">Contacto: <span className="font-weight-normal">{!!resultado && resultado.email}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">Propietario: <span className="font-weight-normal">{!!resultado2 && resultado2.username}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">Contacto: <span className="font-weight-normal">{!!resultado2 && resultado2.email}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">N° Bodega: <span className="font-weight-normal">{!!dpto.bodega_id ? dpto.bodega_id : "No posee"}</span></p>
                                            <p className="card-text font-weight-bold">N° Estacionamiento: <span className="font-weight-normal">{!!dpto.estacionamiento_id ? dpto.estacionamiento_id : "No posee"}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </SidebarPage>
    )
};

export default DepartamentosAdmin;