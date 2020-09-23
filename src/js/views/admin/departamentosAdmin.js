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
        store.departamentoUsuarios.map((dpto) => {
            if (pisos.length > 0) {
                if (!pisos.includes(dpto.piso)) {
                    setPisos([...pisos, pisos.push(dpto.piso)])
                }
            } else {
                setPisos([pisos.push(dpto.piso)])
            }
        })
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
    },[])
    return (
        <SidebarPage>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1>Departamentos</h1>
                        <h4 className="text-center mt-3">Edificio: {!!store.edificioCompleto ? store.edificioCompleto.nombre_edificio : "cargando"}</h4>
                        <h6 className="text-center mt-3">Direccion: {!!store.edificioCompleto ? store.edificioCompleto.direccion : "cargando"}</h6>
                    </div>
                </div>
                <div className="row mt-5 d-flex justify-content-center">
                    <div className="col-md-3 m-1">
                        <Link to="/admin/inicializacion-dptos" className="btn btn-warning">Modelo de Departamentos</Link>
                    </div>
                    <div className="col-md-2 m-1">
                        <Link to="/admin/inicializacion-pisos" className="btn btn-warning">Estructura del Edificio</Link>
                    </div>
                </div>
            </div>
            <div className="container mt-5 bg-white border p-3">
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
                                    pisos.map((piso, index) => {
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
                                            <p className="card-text">Bodega: {dpto.bodega}</p>
                                            <p className="card-text">Estacionamiento: {dpto.estacionamiento}</p>
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
                                            <p className="card-text">Bodega: {dpto.bodega}</p>
                                            <p className="card-text">Estacionamiento: {dpto.estacionamiento}</p>
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
                                    <p className="card-text">Bodega: {departamentoNumero.bodega}</p>
                                    <p className="card-text">Estacionamiento: {departamentoNumero.estacionamiento}</p>
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