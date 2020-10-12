import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDeletePlan from '../../components/modalDeletePlan';
import ModalModifyPlan from '../../components/modalModifyPlan';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';


const ModifyPlans = () => {

    const { actions, store } = useContext(Context)
    const inputCaracteristica = useRef(null)

    const getData = async () => {
        const response = await fetch(`${store.apiURL}/api/planes`);
        const data = await response.json()
        setPlanes(data)
        console.log(data)
    }
    const addPlan = async (plan) => {
        const response = await fetch(`${store.apiURL}/api/planes`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(plan)
        })
        const data = await response.json()
        console.log(data)
        actions.getPlanes()
    }

    useEffect(() => {
        actions.getPlanes()
    }, []);

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [idToModify, setIdToModify] = useState("");


    const handleInput = e => {
        e.preventDefault();
        setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
    };
    const accountRol = "superAdmin"

    const [planes, setPlanes] = useState([
    ])

    const [createPlan, setCreatePlan] = useState(false)

    const [newPlan, setNewPlan] = useState({
        name: "",
        price: "",
        body: [],
        frecuencia: ""
    })

    const deleteItem = (index) => {
        newPlan.body.splice(index, 1);
        setNewPlan((prevState) => {
            return { ...prevState, body: newPlan.body }
        })


    };

    const [modifyPlan, setModifyPlan] = useState(false)

    const [planToModify, setPlanToModify] = useState({
        name: null,
        price: null,
        body: [],
        frecuencia: null
    })

    return (
        accountRol !== "superAdmin" ? <>

            <h1 className="text-center mt-5"> Parece que no tienes acceso a esta página! </h1>
            <Link to="./login" style={{ textDecoration: 'none' }}> <span className="boton-a-inicio shadow ml-4 mt-5"> <i className="fas fa-arrow-circle-left"></i> Login</span> </Link>

        </> : (
                <SidebarPage>
                    <div className="container-fluid my-5">
                        <div className="mx-auto text-center">
                            <h1 className="text-center planes-titulo mb-5">NUESTROS PLANES</h1>
                            <button className="btn btn-verde mb-5" onClick={() => {
                                if (!createPlan) {
                                    setCreatePlan(true)
                                    setNewPlan({
                                        name: "",
                                        price: "",
                                        body: [],
                                        frecuencia: ""
                                    })
                                } else {
                                    setCreatePlan(false)
                                }

                            }}>Crear Nuevo Plan</button>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">


                            {store.planes.length > 0 && store.planes.map((plans, index) => {

                                return (
                                    <div key={index} className="col-9 col-md-5 mb-5 plan">
                                        <div className="card h-md-100 shadow  border-0">

                                            <ModalDeletePlan show={showModal} id={idToDelete} getData={getData} close={() => { setShowModal(false) }} />
                                            <ModalModifyPlan getData={getData} idToModify={idToModify} setPlanes={setPlanes} setModifyPlan={setModifyPlan} modifyPlan={modifyPlan} planToModify={planToModify} setPlanToModify={setPlanToModify} />
                                            <div className="">
                                                <i className="fas fa-pencil-alt cursor-pointer fa-2x btn" onClick={() => {
                                                    setModifyPlan(true)
                                                    setPlanToModify({
                                                        name: plans.name,
                                                        price: plans.price,
                                                        body: plans.body.map((item) => { return item }),
                                                        frecuencia: plans.frecuencia
                                                    })
                                                    setIdToModify(plans.id)
                                                }} >

                                                </i>

                                                <i
                                                    className="fas fa-trash-alt btn fa-2x"
                                                    onClick={() => {
                                                        setShowModal(true)
                                                        setIdToDelete(plans.id)
                                                    }}
                                                />
                                            </div>


                                            <div className="card-body p-0">
                                                <div className=" d-flex justify-content-center align-items-center">
                                                    <div className="text-center">
                                                        <h3 className="card-title m-0 dashboard-subtitle">{plans.name}</h3>
                                                        <span className="plan-price dashboard-subtitle dashboard-subtitle">{plans.price}</span> <span className="tipo-moneda dashboard-subtitle">/ UF</span>
                                                        <h5 className="mb-3"> Pagado {plans.frecuencia}</h5>

                                                    </div>
                                                </div>


                                                {plans.body.map((items, index) => {
                                                    return <li key={index} className="text-center p-3"> <span className="px-2 px-md-4">{items}</span></li>
                                                })}



                                            </div>
                                        </div>

                                    </div>
                                )

                            })}
                        </div>


                        <div className="modal modal-dialog-scrollable overflowy-auto" tabIndex="-1" role="dialog" style={{ display: createPlan ? "inline-block" : "none" }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="border-bottom py-3 text-center">
                                        <button
                                            type="button"
                                            className="close pr-3"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => {
                                                setCreatePlan(false)
                                            }}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h5 className="modal-title">Crear un nuevo plan</h5>

                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="nuevo-plan">Nombre del plan</label>
                                                <input type="text" value={newPlan.name} className="form-control" id="formGroupExampleInput" name="name" placeholder="Plan"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nuevo_plan2">Precio</label>
                                                <input type="number" value={newPlan.price} className="form-control" name="price" id="formGroupExampleInput2" placeholder="Precio del plan"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nuevo_plan3">Frecuencia</label>
                                                <input type="text" value={newPlan.frecuencia} className="form-control" name="frecuencia" id="formGroupExampleInput2" placeholder="Mensual/Semestral/Anual"
                                                    onChange={handleInput}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nuevo_plan3" className="d-block mb-3">Características</label>
                                                <div className="d-flex">
                                                    <span className="btn btn-azul p-1 mr-3"
                                                        onClick={() => {
                                                            if (inputCaracteristica.current.value !== "") {
                                                                newPlan.body.push(inputCaracteristica.current.value)
                                                                inputCaracteristica.current.value = ""
                                                                getData()
                                                            }

                                                        }
                                                        }
                                                    >Agregar</span> <input type="text" className="px-2" ref={inputCaracteristica} id="formGroupExampleInput2" placeholder="Características del plan" />
                                                </div>
                                                <div className="border mt-3">
                                                    {newPlan.body.length > 0 && newPlan.body.map((items, index) => {
                                                        return <>
                                                            <li key={index} className="pl-3">{items}
                                                                <i
                                                                    className="fas fa-trash-alt float-right pr-3 py-1"
                                                                    onClick={() => {
                                                                        deleteItem(index)
                                                                    }}
                                                                />
                                                            </li>   </>
                                                    })}
                                                </div>
                                            </div>
                                        </form>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setCreatePlan(false)
                                                }}>
                                                Atrás
						                    </button>
                                            <button
                                                type="button"
                                                className="btn btn-verde"
                                                data-dismiss="modal"
                                                onClick={() => {
                                                    const values = Object.values(newPlan)

                                                    if (values.includes("") || values.includes(null)) {
                                                        alert('completa todos los datos')
                                                    } else {
                                                        if (newPlan.body.length > 2) {
                                                            addPlan(newPlan)
                                                            setCreatePlan(false)

                                                        } else {
                                                            alert('Deben haber al menos 3 características')
                                                        }
                                                    }
                                                }
                                                }>
                                                Guardar cambios
						                    </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarPage>
            )
    )
};

export default ModifyPlans;