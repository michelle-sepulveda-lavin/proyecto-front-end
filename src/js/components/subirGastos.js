import React, { useContext, useEffect, useState } from 'react';
import SidebarPage from '../components/SidebarPage';
import { Context } from '../store/appContext';
import ModalPromedio from './modalPromedio';

const SubirGastos = () => {
    const { store, actions } = useContext(Context)
    const mesActual = !!store.currentDate && store.currentDate.toLocaleString('default', { month: 'long' })
    const [monto, setMonto] = useState("")
    const [showModal, setshowModal] = useState(false)
    const [promedioMonto, setPromedioMonto] = useState("")
    const [comprobante, setComprobante] = useState(null)
    const handleInputMonto = (e) => {
        setMonto(e.target.value)
    }
    const handleAvatar = (e) => {
        const file = e.target.files[0]
        setComprobante({
            [e.target.id]: file
        })
    }
    useEffect(() => {
        actions.getDptosUsuarios()
        actions.getBodegasDelEdificio()
        actions.getEstacionamientosDelEdificio()
        actions.getDepartamentos()
        actions.getCurrentDate()
        actions.getEdificioCompleto()
        actions.getDptosUsuarios()
        actions.getEdificioCompleto()

    }, [])
    return (
        <SidebarPage>
            <div className="container mt-3">



                <h1>Subir Gastos</h1>

                <h3>Mes: {!!store.currentDate && mesActual.charAt(0).toUpperCase() + mesActual.slice(1)}</h3>

                {/* !!store.departamentoUsuarios && !!store.edificioCompleto && store.departamentoUsuarios.length === store.edificioCompleto.numero_departamentos */} {store.departamentoUsuarios &&

                    <div className="row">
                        <div className=" col-11 col-md-7 mx-auto rounded border bg-white shadow">
                            <form className="pb-4">
                                <h4 className="text-center my-4">Subir Gastos Comunes</h4>
                                <div className="ml-3">

                                    <div>
                                        <div className="">
                                            <label className="text-center">Monto total de gastos</label>
                                            <input type="number" value={monto} className="ml-2" onChange={handleInputMonto} />

                                        </div>
                                        <div className="mt-3">
                                            <label>Comprobante</label>
                                            <input type="file" id="comprobante" className="ml-2" onChange={handleAvatar} accept=".pdf" />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-5">
                                    <button className="btn btn-success" onClick={(e) => {
                                        e.preventDefault()
                                        if (monto !== "" && comprobante !== null) {
                                            setPromedioMonto(actions.calculoGastoPromedio(monto))
                                            setshowModal(true)
                                        }
                                        if (monto === "") {
                                            alert("Debes ingresar un monto")
                                        }
                                        if (comprobante === null) {
                                            alert("Debes ingresar el comprobante")
                                        }
                                    }}>Subir</button>
                                </div>
                            </form>


                        </div>
                        <ModalPromedio showModal={showModal} setshowModal={setshowModal} monto={monto} promedioMonto={promedioMonto} comprobante={comprobante} />
                    </div>

                }

                {/*                 {!!store.edificioCompleto && store.departamentoUsuarios.length !== store.edificioCompleto.numero_departamentos &&
                    <h5 className="text-center mt-5">Debes completar la creación de todos los departamentos antes de poder cargar los gastos comunes</h5>
                } */}

            </div>
        </SidebarPage>
    )
};

export default SubirGastos;