import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const CrearEdificios = () => {
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    return (

        <SidebarPage>
            <div className="container mt-5">
                <div className="container">
                    <h2 className="d-flex justify-content-center">Formulario inicialización edificio</h2>
                </div>
                {
                    store.error !== null &&
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Error</strong>{" "}
                        {store.error}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
                <div className="container mt-4 py-4">
                    <form className="col-12 col-md-6 m-auto border shadow py-5" onSubmit={e => {
                        actions.crearEdificio(e, state)
                        actions.getEdificiosData()
                    }}>
                        <div className="form-group">
                            <label htmlFor="archivoCSV">Archivo CSV</label>
                            <input className="form-control-file" type="file" name="archivoCSV" onChange={actions.cargarCsv} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_edificio">Nombre edificio</label>
                            <input type="text" className="form-control" id="nombre_edificio" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="direccion">Direccion</label>
                            <input type="text" className="form-control" id="direccion" onChange={e => { handleChange(e) }} />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="nombre_administrador">Nombre administrador</label>
                            <input type="text" className="form-control" id="nombre_administrador" onChange={e => { handleChange(e) }} />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="telefono">Telefono </label>
                            <input type="tel" className="form-control" id="telefono" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input type="email" className="form-control" id="correo" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero_pisos">Pisos totales</label>
                            <input type="number" className="form-control" id="numero_pisos" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="numero_departamentos">Cantidad departamentos</label>
                            <input type="number" className="form-control" id="numero_departamentos" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_bodegas">Bodegas totales</label>
                            <input type="number" className="form-control" id="total_bodegas" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="total_estacionamientos">Estacionamientos totales</label>
                            <input type="number" className="form-control" id="total_estacionamientos" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inicio_contratacion">Fecha inicio contrato</label>
                            <input type="date" className="form-control" id="inicio_contratacion" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="termino_contrato">Fecha termino contrato</label>
                            <input type="date" className="form-control" id="termino_contrato" onChange={e => { handleChange(e) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="plan_id">Plan Id</label>
                            <input type="number" className="form-control" id="plan_id" onChange={e => { handleChange(e) }} />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="username_id">Usuario Id</label>
                            <input type="number" className="form-control" id="username_id" onChange={e => { handleChange(e) }} />
                        </div> */}
                        <div className="form-group">
                            <label htmlFor="dia_vencimiento">Dia vencimiento gastos comunes</label>
                            <input type="number" className="form-control" id="dia_vencimiento" onChange={e => { handleChange(e) }} />
                        </div>
                        <button className="btn btn-primary">Crear edificio</button>
                    </form>
                </div>
            </div>
            <Link to="/listado-edificios" style={{ textDecoration: 'none' }} className="my-4"> <span className="boton-a-inicio shadow ml-3"> <i className="fas fa-arrow-circle-left"></i> Ir a edificios</span> </Link>
        </SidebarPage>
    )
};

export default CrearEdificios;