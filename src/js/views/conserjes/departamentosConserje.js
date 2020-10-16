import React, { useContext, useEffect, useState } from 'react';
import ModalNuevoResidente from '../../components/modalNuevoResidente';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';


const DepartamentosConserje = () => {
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
        actions.getDptosUsuarios()
        actions.getUsuariosDelEdificio()

    }, [])

    return (
        <SidebarPage>
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <h1>Departamentos</h1>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col d-flex justify-content-center">
                        <button type="button" className="btn btn-verde" data-toggle="modal" data-target="#nuevoResidente">
                            Solicitud Nuevo Residente
                        </button>
                        <ModalNuevoResidente/>
                    </div>
                </div>

            </div>
            <div className="container border bg-white mt-2 p-3" style={{ width: "50vw" }}>
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
                                <input type="number" className="form-control" name="numero_departamento" onChange={e => setNumero({ dpto: e.target.value })} />
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
                        store.departamentosFiltrados.map((dpto, index) => {
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

export default DepartamentosConserje;