import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const ListadoEdificioAdm = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getEdificiosData()
    }, [])
    return (
        <>
            <SidebarPage>
                <div className="row">
                    <div className="col">
                        <h1 className="py-3 pl-3">Listado de edificios</h1>
                    </div>
                </div>
                {
                    store.edificios.length > 0 ?
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-md-9 mx-auto overflow-auto ">
                                    <table className="table  table-bordered border">
                                        <thead className="btn-oscuro text-center">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Dirección</th>
                                                <th scope="col">Correo</th>
                                                <th scope="col">Teléfono</th>
                                                <th scope="col">Contrato Hasta</th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {store.edificios.length > 0 && store.edificios.map((edificio, index) => {
                                                if (index < 10) {

                                                    return (

                                                        <tr key={index}>
                                                            <th scope="row">{edificio.id}</th>
                                                            <td>{edificio.nombre_edificio}</td>
                                                            <td>{edificio.direccion}</td>
                                                            <td>{edificio.correo}</td>
                                                            <td>{edificio.telefono}</td>
                                                            <td>{edificio.termino_contrato}</td>
                                                            <td>
                                                                <Link to={`/listado-edificios/${edificio.id}`}>
                                                                    <span className="btn btn-azul" >Detalle</span> </Link> </td>
                                                        </tr>
                                                    )
                                                }
                                            })}
                                        </tbody>
                                    </table>
                                    <Link to="./crearedificio"> <div className="btn btn-verde mb-4"> Crear edificio nuevo</div> </Link>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-12">
                                    <h2 className="text-center">No hay edificios creados</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 m-auto">
                                    <Link to="./crearedificio" className="btn btn-verde">Crear edificio nuevo</Link>
                                </div>
                            </div>
                        </div>

                }


            </SidebarPage>


        </>
    )
};

export default ListadoEdificioAdm;