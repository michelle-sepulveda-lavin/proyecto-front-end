import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const GastosDepartamentos = () => {
    const { store, actions } = useContext(Context)
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const estados = ["No Pagado", "Moroso", "En Revisión", "Pagado"];
    const [gastoSeleccionado, setGastoSeleccionado] = useState("");
    const [estadoPago, setEstadoPago] = useState("todos")
    const handleInputGastos = (e) => {
        let value = e.target.value;
        let split = value.split(",")
        const month = parseInt(split[0])
        const year = parseInt(split[1])
        setGastoSeleccionado({
            month: month,
            year: year
        })
    };
    const [gastosMes, setGastosMes] = useState([]);
    return (
        <SidebarPage>
            <h1 className="mt-4">Gastos comunes por departamento</h1>
            <div className="container pb-4">
                <div className="d-flex justify-content-center mt-5">
                    <div className="form-inline">
                        <div className="d-flex align-items-center mr-3">
                            <p className="m-0">Busca por fecha: </p>
                        </div>
                        <select className=" form-control mr-3" defaultValue={'default'} id="turno" onChange={handleInputGastos}>
                            <option>Seleccionar</option>
                            {store.montosTotalesMes.length > 0 ?
                                store.montosTotalesMes.map((monto) => {
                                    return <option value={[monto.month, monto.year]}>{meses[monto.month]} - {monto.year}</option>
                                })
                                :
                                <option disabled>No hay gastos cargados al sistema</option>
                            }

                        </select>
                        <div>
                            <button className="btn btn-success" onClick={() => {
                                if (gastoSeleccionado !== "") {
                                    setGastosMes(actions.getGastosMonthYear(gastoSeleccionado.month, gastoSeleccionado.year, setGastosMes))
                                }
                            }}>Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="container min-height-50">
                    <div>
                        <div className="row mx-auto mt-4">
                            <div className="col-12 col-md-10 mx-auto overflow-auto pb-4">
                                {gastosMes.length > 0 &&
                                    <>
                                        <div className="d-flex justify-content-center mb-4">
                                            <span className="boton-hover btn border-info  mr-2 rounded-pill border shadow-sm" onClick={() => {
                                                setEstadoPago("pagado")
                                            }}>Pagados</span>
                                            <span className="btn boton-hover border-info  rounded-pill border shadow-sm mr-2" onClick={() => {
                                                setEstadoPago("noPagado")
                                            }}>No pagados</span>
                                            <span className="btn boton-hover border  rounded border shadow-sm" onClick={() => {
                                                setEstadoPago("todos")
                                            }}>Todos</span>
                                        </div>

                                        < table className="table text-center overflow-auto mx-auto ">
                                            <thead className="thead-dark text-center mx-auto">
                                                <tr className="mx-auto">
                                                    <th scope="col">Depto</th>
                                                    <th scope="col">Monto</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Promedio por Depto</th>

                                                    <th scope="col">Comprobante</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {gastosMes.length > 0 && gastosMes.map((gasto, index) => {

                                                    if (gasto.estado === estadoPago || estadoPago === "todos") {
                                                        return (

                                                            <tr key={index}>
                                                                <th scope="row">{gasto.departamento.numero_depto}</th>
                                                                <td>{gasto.monto}</td>
                                                                <td>{gasto.estado === "noPagado" ? estados[0] : gasto.estado === "moroso" ? estados[1] : gasto.estado === "revision" ? estados[2] : gasto.estado === "pagado" ? estados[3] : ""}</td>
                                                                <td>{"POR DEFINIR"}</td>

                                                                <td>

                                                                    <span className="btn btn-success"
                                                                    >Pagado</span></td>
                                                            </tr>
                                                        )
                                                    }
                                                })
                                                }
                                            </tbody>
                                        </table>
                                    </>
                                }
                                {store.montosTotalesMes.length === 0 &&

                                    <h4>No hay montos ingresados en este edificio</h4>

                                }

                            </div>



                        </div>



                    </div>




                </div>
                <Link to="/admin/gastos-comunes" style={{ textDecoration: 'none' }}>
                    <span className="boton-a-inicio  shadow">
                        <i className="fas fa-arrow-circle-left"></i> Ir atras
                    </span>
                </Link>
            </div>
        </SidebarPage>
    )
};

export default GastosDepartamentos;