import React, { useContext, useEffect, useState } from 'react';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const CrearEdificios = () => {
    const { store, actions } = useContext(Context)
    const [state, setState] = useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        actions.getPlanes()
    },[])

    return (

        <SidebarPage>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <h2 className="d-flex justify-content-center">Inicialización edificio</h2>
                    </div>
                </div>
                {
                    store.flagCreacionEdificio === false ?
                        <>
                            <div className="row mt-5" style={{ height: "100px" }}>
                                <div className="col d-flex justify-content-center m-2">
                                    <button className="btn btn-primary" style={{ width: "40vh" }} onClick={() => { actions.flagCrearEdificio(true) }}>
                                        Formulario
                                    </button>
                                </div>
                            </div>
                            <div className="row" style={{ height: "100px" }}>
                                <div className="col d-flex justify-content-center m-2">
                                    <button className="btn btn-secondary " style={{ width: "40vh" }} disabled>
                                        Archivo CSV
                                    </button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <form className="col m-auto border shadow" onSubmit={e => {
                                actions.crearEdificio(e, state)
                                actions.getEdificiosData()
                            }}>
                                {
                                    !!store.errorCreacionDpto &&
                                    <div class="alert alert-danger" role="alert">
                                        {store.errorCreacionDpto}
                                    </div>
                                }

                                <div className="form-row py-3">
                                    <div className="col-md-6">
                                        <label htmlFor="nombre_edificio">Nombre edificio</label>
                                        <input type="text" className="form-control" name="nombre_edificio" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="direccion">Direccion</label>
                                        <input type="text" className="form-control" name="direccion" onChange={e => { handleChange(e) }} />
                                    </div>
                                </div>
                                <div className="form-row py-3">
                                    <div className="col-md-6">
                                        <label htmlFor="telefono">Telefono </label>
                                        <input type="tel" className="form-control" name="telefono" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="correo">Correo</label>
                                        <input type="email" className="form-control" name="correo" onChange={e => { handleChange(e) }} />
                                    </div>
                                </div>
                                <div className="form-row py-3">
                                    <div className="col-md-3">
                                        <label htmlFor="numero_pisos">Pisos totales</label>
                                        <input type="number" className="form-control" name="numero_pisos" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="numero_departamentos">Cantidad departamentos</label>
                                        <input type="number" className="form-control" name="numero_departamentos" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="total_bodegas">Bodegas totales</label>
                                        <input type="number" className="form-control" name="total_bodegas" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="total_estacionamientos">Estacionamientos totales</label>
                                        <input type="number" className="form-control" name="total_estacionamientos" onChange={e => { handleChange(e) }} />
                                    </div>
                                </div>
                                <div className="form-row py-3">
                                    <div className="col-md-3">
                                        <label htmlFor="inicio_contratacion">Fecha inicio contrato</label>
                                        <input type="date" className="form-control" name="inicio_contratacion" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="termino_contrato">Fecha termino contrato</label>
                                        <input type="date" className="form-control" name="termino_contrato" onChange={e => { handleChange(e) }} />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="plan_id">Plan Id</label>
                                        <select defaultValue={'default'} className="form-control form-control-sm" name="plan_id" onChange={e => handleChange(e)}>
                                            <option value="default" disabled>Seleccione</option>
                                            {
                                                !!store.planes && store.planes.map((plan, index) => {
                                                    return (
                                                        <option key={index} value={plan.id}>{plan.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="dia_vencimiento">Dia vencimiento gastos comunes</label>
                                        <input type="number" className="form-control" name="dia_vencimiento" onChange={e => {handleChange(e)}} />
                                    </div>

                                </div>
                                <div className="col d-flex justify-content-center my-5">
                                    <button className="btn btn-primary mx-1">Crear edificio</button>
                                    <button className="btn btn-secondary" onClick={()=> actions.flagCrearEdificio(false) }>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </>
                    }
            </div>

        </SidebarPage>
    )
};

export default CrearEdificios;