import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../store/appContext';

const InicializacionDptos = () => {
    const { actions, store } = useContext(Context);
    const [modelInfo, setModelInfo] = useState({});

    const handleChange = (e) => {
        setModelInfo({
            ...modelInfo, [e.target.name]: e.target.value
        })
    };
    const limpiarFormulario = (e) => {
        e.target.reset()
    }
    const limpiarState = () => {
        setModelInfo({})
    }

    useEffect(() => {
        actions.getCurrentEdificio()
        actions.getDepartamentos()

    }, [])

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h2>Formulario de Departamentos</h2>
                    </div>
                </div>
            </div>
            <div className="container">
                <form className="mt-5" onSubmit={e => {
                    actions.handleDepartamentos(e, modelInfo)
                    limpiarFormulario(e)
                    limpiarState()
                }}>
                    <div className="row border pt-3">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="modelo">Modelo</label>
                                <input type="text" className="form-control" name="modelo" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="total">Superficie total</label>
                                <input type="number" className="form-control" name="total" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="interior">Superficie interior</label>
                                <input type="number" className="form-control" name="interior" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="terraza">Superficie terraza</label>
                                <input type="number" className="form-control" name="terraza" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="cantidad_total">Total Unidades</label>
                                <input type="number" className="form-control" name="cantidad_total" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <div className="col-md-2 my-auto">
                            <div className="form-group my-auto">
                                <button type="submit" className="btn btn-primary">Añadir</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <table className="table table-bordered table-responsive-md">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Modelo</th>
                                    <th scope="col">Superficie total</th>
                                    <th scope="col">Superficie interior</th>
                                    <th scope="col">Superficie terraza</th>
                                    <th scope="col">Total Unidades</th>
                                    <th scope="col">Borrar</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    store.departamentos.length > 0 &&
                                    store.departamentos.map((dpto, index) => {
                                        return (

                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{dpto.modelo}</td>
                                                <td>{dpto.total}</td>
                                                <td>{dpto.interior}</td>
                                                <td>{dpto.terraza}</td>
                                                <td>{dpto.cantidad_total}</td>
                                                <td><i className="fas fa-trash-alt btn" onClick={() => {
                                                    console.log(index)
                                                    actions.deleteModeloDpto(index)
                                                }}></i></td>
                                            </tr>
                                        )
                                    })
                                }
                                {/*                                 <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><button onClick={cuentaDepartamentos}>Contar</button></td>
                                    <td className="bg-info text-white">Total</td>
                                    <td>{

                                    }
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-3 m-auto">
                    <Link to="/admin/departamentos" style={{ textDecoration: 'none' }}>
                        <span className="boton-a-inicio shadow">
                            <i className="fas fa-arrow-circle-left"></i> Ir atras
                    </span>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default InicializacionDptos;