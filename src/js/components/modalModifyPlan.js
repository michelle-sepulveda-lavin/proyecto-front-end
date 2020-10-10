import React, { useContext, useRef } from "react";
import { Context } from "../store/appContext";

const ModalModifyPlan = (props) => {

    const { actions } = useContext(Context)
    const handleInput = e => {
        e.preventDefault();
        props.setPlanToModify({ ...props.planToModify, [e.target.name]: e.target.value });
    };
    const inputCaracteristica = useRef("")

    const deleteItem = (index) => {
        props.planToModify.body.splice(index, 1);
        props.setPlanToModify((prevState) => {
            return { ...prevState, body: props.planToModify.body }
        })
    }

    const changePlan = async (modifiedPlan, id) => {
        const response = await fetch(`http://127.0.0.1:5000/api/planes/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(modifiedPlan)
        })
        const data = await response.json()
        console.log(data)
        actions.getPlanes()
        props.getData()
    }



    return (
        <div className="modal modal-dialog-scrollable overflowy-auto" tabIndex="-1" role="dialog" style={{ display: props.modifyPlan ? "inline-block" : "none" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="border-bottom py-3 text-center">
                        <button
                            type="button"
                            className="close pr-3"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                props.setModifyPlan(false)
                            }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title">Modificar Plan</h5>

                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <input type="text" defaultValue={props.planToModify.name} className="form-control" id="formGroupExampleInput" name="name" placeholder="Plan"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <input type="number" defaultValue={props.planToModify.price} className="form-control" name="price" id="formGroupExampleInput2" placeholder="Precio del plan"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <input type="text" defaultValue={props.planToModify.frecuencia} className="form-control" name="frecuencia" id="formGroupExampleInput2" placeholder="Mensual/Semestral/Anual"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nuevo_plan3" className="d-block mb-3">Características</label>
                                <div className="d-flex">
                                    <span className="btn btn-azul p-1 mr-3"
                                        onClick={() => {
                                            if (inputCaracteristica.current.value !== "") {
                                                props.planToModify.body.push(inputCaracteristica.current.value)
                                                inputCaracteristica.current.value = ""
                                                changePlan(props.planToModify, props.idToModify)
                                            }

                                        }
                                        }
                                    >Agregar</span> <input type="text" className="px-2" id="formGroupExampleInput2" placeholder="Características del plan" ref={inputCaracteristica} />
                                </div>
                                <div className="border mt-3">
                                    {props.planToModify.body.length > 0 && props.planToModify.body.map((items, index) => {
                                        return (
                                            <li key={index} className="pl-3"> {items}
                                                <i
                                                    className="fas fa-trash-alt float-right pr-3 py-1"
                                                    onClick={() => {
                                                        deleteItem(index)
                                                        changePlan(props.planToModify, props.idToModify)
                                                    }}
                                                />
                                            </li>
                                        )
                                    })}
                                </div>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    props.setModifyPlan(false)
                                }}
                            >
                                Atrás
						</button>
                            <button
                                type="button"
                                className="btn btn-verde"
                                data-dismiss="modal"
                                onClick={() => {
                                    const values = Object.values(props.planToModify)

                                    if (values.includes("") || values.includes(null)) {
                                        alert('completa todos los datos')
                                    } else {
                                        if (props.planToModify.body.length > 0) {
                                            changePlan(props.planToModify, props.idToModify)
                                            props.setModifyPlan(false)
                                        } else {
                                            alert('Las características no pueden estar vacías')
                                        }
                                    }
                                }
                                }
                            >
                                Guardar cambios
						</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default ModalModifyPlan;