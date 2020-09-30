import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const DepartamentosAdmin = () => {
    const { store, actions } = useContext(Context);
    const [pisos, setPisos] = useState([]);
    const [numero, setNumero] = useState()
    const [departamentoNumero, setdepartamentoNumero] = useState()

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
        actions.getDepartamentos()
        actions.getDptosUsuarios()
        actions.getBodegasDelEdificio()
        actions.getEstacionamientosDelEdificio()

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
                {/* <div className="row">
                    <div className="col">
                        <h5>Filtros de Busqueda:</h5>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col m-1">
                        <div className="btn-group btn-block">
                            <button type="button" className="btn btn-azul dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={contadorPisos}>
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
                    <div className="col m-1">
                        <div className="btn-group btn-block">
                            <button type="button" className="btn btn-azul dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <div className="col m-1">
                        <div className="row">
                            <div className="col-md-8">
                                <label htmlFor="numero_departamento" className="sr-only">Numero Departamento</label>
                                <input type="number" className="form-control" name="numero_departamento" onChange={e => setNumero(e.target.value)} />
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-azul" onClick={e => buscaDpto(e)}><i className="fas fa-search"></i></button>
                            </div>
                        </div>
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
                                    <div className="card btn-oscuro mb-3" style={{ maxWidth: "18rem" }}>
                                        <div className="card-header d-flex justify-content-between">
                                            <p  style={{fontSize: "2em"}}>
                                                {dpto.numero_departamento}
                                            </p>
                                            <p className="card-text">{dpto.estado}</p>
                                        </div>
                                        <div className="card-body  bg-white text-dark">

                                            <p className="card-text font-weight-bold border-bottom">Residente: <span className="font-weight-normal text-capitalize">{dpto.residente.name}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">Contacto: <span className="font-weight-normal">{dpto.residente.email}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">N° Bodega: <span className="font-weight-normal">{!!dpto.bodega_id? dpto.bodega_id : "No posee"}</span></p>
                                            <p className="card-text font-weight-bold">N° Estacionamiento: <span className="font-weight-normal">{!!dpto.estacionamiento_id? dpto.estacionamiento_id : "No posee"}</span></p>
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
                                    <div className="card btn-oscuro mb-3" style={{ maxWidth: "18rem" }}>
                                        <div className="card-header d-flex justify-content-between">
                                            <p  style={{fontSize: "2em"}}>
                                                {dpto.numero_departamento}
                                            </p>
                                            <p className="card-text">{dpto.estado}</p>
                                        </div>
                                        <div className="card-body bg-white text-dark">
                                            <p className="card-text font-weight-bold border-bottom">Residente: <span className="font-weight-normal text-capitalize">{dpto.residente.name}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">Contacto: <span className="font-weight-normal">{dpto.residente.email}</span></p>
                                            <p className="card-text font-weight-bold border-bottom">N° Bodega: <span className="font-weight-normal">{!!dpto.bodega_id? dpto.bodega_id : "No posee"}</span></p>
                                            <p className="card-text font-weight-bold">N° Estacionamiento: <span className="font-weight-normal">{!!dpto.estacionamiento_id? dpto.estacionamiento_id : "No posee"}</span></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        !!departamentoNumero &&
                        <div className="col-md-4">
                            <div className="card btn-oscuro mb-3" style={{ maxWidth: "18rem" }}>
                                <div className="card-header d-flex justify-content-between">
                                    <p style={{fontSize: "2em"}}>
                                        {departamentoNumero.numero_departamento}
                                    </p>
                                    <p className="card-text">{departamentoNumero.estado}</p>
                                </div>
                                <div className="card-body bg-white text-dark">
                                    <p className="card-text font-weight-bold border-bottom">Residente: <span className="font-weight-normal text-capitalize">{departamentoNumero.residente.name}</span></p>
                                    <p className="card-text font-weight-bold border-bottom">Contacto: <span className="font-weight-normal">{departamentoNumero.residente.email}</span></p>
                                    <p className="card-text font-weight-bold border-bottom">N° Bodega: <span className="font-weight-normal">{!!departamentoNumero.bodega_id? departamentoNumero.bodega_id : "No posee"}</span></p>
                                    <p className="card-text font-weight-bold">N° Estacionamiento: <span className="font-weight-normal">{!!departamentoNumero.estacionamiento_id? departamentoNumero.estacionamiento_id : "No posee"}</span></p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </SidebarPage>
    )
};

export default DepartamentosAdmin;