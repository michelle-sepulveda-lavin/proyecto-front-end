import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const PaqueteriaUser = () => {

    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getEdificioCompleto()
        actions.getPaqueteriaUsuario()
        actions.getDepartamentoActualInfo()
        actions.getDepartamentoActualUsuario()
    }, [])
    return (
        <SidebarPage>
            <div className="container">
                <div className="row my-4">
                    <div className="col">
                        <h1 className="text-center">Paquetería</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {
                            !!store.paqueteriaUsuario ?
                                <table className="table table-bordered border text-center table-responsive-md">
                                    <thead className="btn-oscuro text-white">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Id Paquete</th>
                                            <th scope="col">Descripción</th>
                                            <th scope="col">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store.paqueteriaUsuario.map((pqte, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{pqte.id}</td>
                                                        <td>{pqte.descripcion}</td>
                                                        <td>{pqte.estado === false && "En Conserjeria"}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                                :
                                <h4 className="text-center">No hay paquetes en conserjería para este departamento</h4>
                        }
                    </div>
                </div>
            </div>
        </SidebarPage>
    )
};

export default PaqueteriaUser;