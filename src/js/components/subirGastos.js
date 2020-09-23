import React, { useContext, useState } from 'react';
import SidebarPage from '../components/SidebarPage';
import { Context } from '../store/appContext';
import ModalPromedio from './modalPromedio';

const SubirGastos = () => {
    const { store } = useContext(Context)
    /* const mesActual = store.currentDate.toLocaleString('default', { month: 'long' }); */
    const [monto, setMonto] = useState("")
    const [promedioMonto, setPromedioMonto] = useState(false)
    const handleInputMonto = (e) => {
        setMonto(e.target.value)
    }
    return (
        <SidebarPage>
            <div className="container mt-3">



                <h1>Subir Gastos</h1>

                <h3>Mes: {/* {mesActual.charAt(0).toUpperCase() + mesActual.slice(1)} */}</h3>

                <div className="row">
                    <div className=" col-11 col-md-7 mx-auto border bg-white shadow">
                        <form className="pb-4">
                            <h4 className="text-center my-4">Subir Gastos Comunes</h4>
                            <div className="ml-3 d-flex justify-content-center align-items-center">
                                <div>
                                    <label className="text-center">Monto total de gastos</label>
                                    <input type="number" value={monto} className="ml-2" onChange={handleInputMonto} />
                                </div>

                            </div>
                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-success" onClick={(e) => {
                                    e.preventDefault()
                                    if (monto !== "") {
                                        setPromedioMonto(true)
                                    }
                                }}>Subir</button>
                            </div>
                        </form>


                    </div>
                    <ModalPromedio promedioMonto={promedioMonto} setPromedioMonto={setPromedioMonto} monto={monto} />
                </div>






            </div>
        </SidebarPage>
    )
};

export default SubirGastos;