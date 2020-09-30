import React, { useContext, useEffect } from 'react';
import ModalPaquete from '../../components/modalPaquete';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const PaqueteriaConserje = () => {
    const { actions, store } = useContext(Context);


    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getPaqueteria()
        actions.getUsuariosDelEdificio()
    }, [])
    return (
        <SidebarPage>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Paquetería</h1>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col  d-flex justify-content-end">
                        <button type="button" className="btn btn-azul" data-toggle="modal" data-target="#modalPaquete">
                            Agregar paquete
                        </button>
                        <ModalPaquete />
                    </div>
                </div>

                <div className="row ">
                    <div className="col mt-5">
                        {
                            store.paqueteriaEdificio.length > 0 ?
                                <table className="table table-bordered border text-center table-responsive-md">
                                    <thead className="btn-oscuro text-white">
                                        <tr>
                                            <th scope="col">#</th>
                                            {/* <th scope="col">Residente</th> */}
                                            <th scope="col">N° Departamento</th>
                                            <th scope="col">Piso</th>
                                            <th scope="col">Id Paquete</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            !!store.paqueteriaEdificio &&
                                            store.paqueteriaEdificio.map((pqte, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        {/* <td>{pqte.departamento.residente}</td> */}
                                                        <td>{pqte.departamento.numero_departamento}</td>
                                                        <td>{pqte.departamento.piso}</td>
                                                        <td>{pqte.id}</td>
                                                        <td>{pqte.estado === false && "En Conserjeria"}</td>
                                                        <td><button className="btn btn-verde" onClick={() => { actions.estadoPaquete(index) }}>Entregado</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <h5 className="text-center">No ha paquetes por entregar</h5>

                        }
                    </div>
                </div>
            </div>

        </SidebarPage>
    )
};

export default PaqueteriaConserje;