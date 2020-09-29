import React, { useContext, useEffect, useState } from 'react';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';


const DepartamentosConserje = () => {
    const { store, actions } = useContext(Context);
    const [departamentoNumero, setdepartamentoNumero] = useState()
    const [pisos, setPisos] = useState([]);
    const [numero, setNumero] = useState()

    const contadorPisos = () => {
        const auxiliar = store.departamentoUsuarios.map((dpto) => {
            return dpto.piso
        })
        const aux2 = [...new Set(auxiliar)]
        setPisos(aux2)
    }
    const buscaDpto = () => {
        const aux = store.departamentoUsuarios.filter((dpto) => {
            return dpto.numero_departamento === numero
        })
        setdepartamentoNumero(aux[0])
        actions.limpiarCamposFiltrado()
    }

    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getDptosUsuarios()

    }, [])

    return (
        <SidebarPage>
            <div className="container">
                <div className="row">
                    <div className="col mt-4">
                        <h1>Departamentos</h1>
                    </div>
                </div>

                <div className="container mt-4 bg-white border p-3">
                    <div className="row">
                        <div className="col">
                            <h5>Filtros de Busqueda:</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="btn-group">
                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={contadorPisos}>
                                    Piso
                            </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => actions.filtradoPiso("todos")}>
                                        Todos
                                </a>
                                    {
                                        !!pisos &&
                                        pisos.sort(function (a, b) { return a - b }).map((piso, index) => {
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
                        <div className="col-md-4">
                            <div className="btn-group">
                                <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Estado
                            </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => actions.filtradoEstado("habitado")}>
                                        Habitado
                                </a>
                                    <a className="dropdown-item" onClick={() => actions.filtradoEstado("deshabitado")}>
                                        Deshabitado
                                </a>
                                    <a className="dropdown-item" onClick={() => actions.filtradoEstado("todos")}>
                                        Todos
                                </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 d-flex">
                            <label htmlFor="numero_departamento" className="sr-only">Numero Departamento</label>
                            <input type="number" className="form-control" name="numero_departamento" onChange={e => setNumero(e.target.value)} />
                            <button className="btn btn-info mx-2" onClick={e => buscaDpto(e)}>Buscar</button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        {
                            !!store.departamentosPorPiso &&
                            store.departamentosPorPiso.map((dpto, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <div className="card border-info mb-3" style={{ maxWidth: "18rem" }}>
                                            <div className="card-header d-flex justify-content-between">
                                                <p>
                                                    {dpto.numero_departamento}
                                                </p>
                                                <p className="card-text">{dpto.estado}</p>
                                            </div>
                                            <div className="card-body text-info">
                                                <p className="card-text">Residente: {dpto.residente.name}</p>
                                                <p className="card-text">Contacto: {dpto.residente.email}</p>
                                                <p className="card-text">N° Bodega: {dpto.bodega_id}</p>
                                                <p className="card-text">N° Estacionamiento: {dpto.estacionamiento_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            !!store.departamentoEstado &&
                            store.departamentoEstado.map((dpto, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <div className="card border-info mb-3" style={{ maxWidth: "18rem" }}>
                                            <div className="card-header d-flex justify-content-between">
                                                <p>
                                                    {dpto.numero_departamento}
                                                </p>
                                                <p className="card-text">{dpto.estado}</p>
                                            </div>
                                            <div className="card-body text-info">
                                                <p className="card-text">Residente: {dpto.residente.name}</p>
                                                <p className="card-text">Contacto {dpto.residente.email}</p>
                                                <p className="card-text">N° Bodega: {dpto.bodega_id}</p>
                                                <p className="card-text">N° Estacionamiento: {dpto.estacionamiento_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            !!departamentoNumero &&
                            <div className="col-md-4">
                                <div className="card border-info mb-3" style={{ maxWidth: "18rem" }}>
                                    <div className="card-header d-flex justify-content-between">
                                        <p>
                                            {departamentoNumero.numero_departamento}
                                        </p>
                                        <p className="card-text">{departamentoNumero.estado}</p>
                                    </div>
                                    <div className="card-body text-info">
                                        <p className="card-text">Residente: {departamentoNumero.residente.name}</p>
                                        <p className="card-text">Contacto: {departamentoNumero.residente.email}</p>
                                        <p className="card-text">N° Bodega: {departamentoNumero.bodega_id}</p>
                                        <p className="card-text">N° Estacionamiento: {departamentoNumero.estacionamiento_id}</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </SidebarPage>
    )
};

export default DepartamentosConserje;