import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ModalDeleteEdificio from '../../components/modalDeleteEdificio';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const DetalleEdificio = () => {
    const { actions, store } = useContext(Context);
    const { id } = useParams()

    const getEdificio = async (id) => {
        const response = await fetch(`http://127.0.0.1:5000/crearedificio/${id}`)
        const data = await response.json()
        setEdificio(data)
    }

    const changeEdificio = async (edificioNuevo, id) => {
        const response = await fetch(`http://127.0.0.1:5000/crearedificio/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(edificioNuevo)
        })
        const data = await response.json()
    }

    useEffect(() => {
        getEdificio(id)
        actions.getPlanes()
        actions.getAdministradorEdificio(id)

    }, [])

    const [edificio, setEdificio] = useState(null)
    const [edificioModificado, setEdificioModificado] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [modify, setModify] = useState(false)
    const handleInput = e => {
        setEdificioModificado({ ...edificioModificado, [e.target.name]: e.target.value });
    };


    return (
        <SidebarPage>

            <h1 className="pt-4  pl-3 text-center">Edificio {edificio && edificio.nombre_edificio}</h1>
            <div className="contenedor-edificio my-md-3 mx-auto">

                <div className="row row-cols-1 row-cols-md-4">
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row ">
                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-phone edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Teléfono</h5>
                                        <p className="card-text">{edificio && edificio.telefono}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-route edificio-color-4 "></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Dirección</h5>
                                        <p className="card-text">
                                            {edificio && edificio.direccion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-file-signature edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Inicio Contrato</h5>
                                        <p className="card-text">{edificio && edificio.inicio_contratacion}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card  h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-file-contract edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Fin Contrato</h5>
                                        <p className="card-text">{edificio && edificio.termino_contrato}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-4">
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">

                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-house-user edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Departamentos</h5>
                                        <p className="card-text">{edificio && edificio.numero_departamentos}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">

                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-warehouse edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Bodegas</h5>
                                        <p className="card-text">{edificio && edificio.total_bodegas}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">

                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-car-side edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Estacionamientos</h5>
                                        <p className="card-text">{edificio && edificio.total_estacionamientos}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">

                                <div className="col-lg-3 d-flex align-items-center justify-content-center"><i className="fas fa-building edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Pisos</h5>
                                        <p className="card-text">{edificio && edificio.numero_pisos}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row ">
                                <div className="col-lg-3 d-flex align-items-center justify-content-start"><i className="fas fa-user-tie edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Administrador</h5>
                                        <p className="card-text">{edificio && modify === false && store.administradorEdificio ? store.administradorEdificio.username : edificio && modify === true && store.administradorEdificio.username ? (
                                            <input className="mt-2" name="nombre_administrador" value={edificioModificado.nombre_administrador}
                                                onChange={handleInput}
                                            ></input>
                                        ) : "Aún no asignado"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-start"><i className="far fa-envelope edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Correo</h5>
                                        <p className="card-text">{edificio && modify === false ? edificio.correo : edificio && modify === true ? (
                                            <input name="correo" value={edificioModificado.correo} className="px-3 mt-2"
                                                onChange={handleInput}
                                            ></input>
                                        ) : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-start"><i className="fas fa-money-check-alt edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Plan Seleccionado</h5>
                                        <p className="card-text">{edificio && modify === false ? edificio.plan_name : edificio && modify === true ? (
                                            <select className="form-control form-control-sm mt-2" name="plan_id" onChange={handleInput}> {
                                                !!store.planes &&
                                                store.planes.map((plan, index) => {
                                                    return (
                                                        <option key={index} value={plan.id}>{plan.name}</option>
                                                    )
                                                })

                                            }
                                            </select>
                                        ) : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col mb-4">
                        <div className="card h-100 shadow-sm">

                            <div className="card-body text-center row">
                                <div className="col-lg-3 d-flex align-items-center justify-content-start"><i className="fas fa-money-bill-alt edificio-color-4"></i></div>
                                <div className="col-lg-9 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h5 className="card-title mb-0 mt-2 mt-md-0">Vencimiento De Gastos Comunes</h5>
                                        <p className="card-text">{edificio && modify === false ? <p>{edificio.dia_vencimiento} de cada mes</p> : edificio && modify === true ? (
                                            <>
                                                <input name="dia_vencimiento" value={edificioModificado.dia_vencimiento} className="text-center mt-2"
                                                    onChange={handleInput}
                                                ></input>
                                                <p>de cada mes</p>
                                            </>
                                        ) : ""}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-center align-items-center mt-3 mr-1">


                    <span className={"btn btn-danger px-2 " + (modify === true ? " d-none" : "")} onClick={() => {
                        setShowModal(true)
                    }}> Eliminar Edificio <i className="far fa-trash-alt"></i></span>


                    <div className={"btn btn-success ml-1" + (modify === true ? " d-none" : "")} onClick={() => {
                        setModify(true)
                        setEdificioModificado(edificio)
                    }}>
                        Modificar <i className="fas fa-pencil-alt cursor-pointer"> </i>  </div>


                    <div className={"btn btn-secondary ml-1" + (modify === false ? " d-none" : "")} onClick={() => {
                        setModify(false)
                        setEdificioModificado(edificio)
                    }}>
                        Cancelar   <i className="fas fa-times"></i></div>


                    <div className="d-flex justify-content-center">
                        <div className={"btn btn-success ml-1" + (modify === false ? " d-none" : "")} onClick={() => {
                            setEdificio(edificioModificado)
                            changeEdificio(edificioModificado, id)
                            setModify(false)

                        }}>
                            Guardar Cambios   <i className="fas fa-check"></i></div>
                    </div>



                </div>




            </div>
            <Link to="/listado-edificios" style={{ textDecoration: 'none' }} className="my-4"> <span className="boton-a-inicio shadow ml-3"> <i className="fas fa-arrow-circle-left"></i> Ir a edificios</span> </Link>
            <ModalDeleteEdificio show={showModal} id={id} close={() => { setShowModal(false) }} />
        </SidebarPage >
    )
};

export default DetalleEdificio;