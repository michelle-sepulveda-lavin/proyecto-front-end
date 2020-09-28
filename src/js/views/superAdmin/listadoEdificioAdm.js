import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const ListadoEdificioAdm = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <SidebarPage>
                <h1 className="py-3 pl-3">Listado de edificios</h1>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto">
                            <table className="table table-responsive  border">
                                <thead className="thead-dark text-center">
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
                                                            <span className="btn btn-warning" >Detalle</span> </Link> </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                            <Link to="./crearedificio"> <div className="btn btn-success mb-4"> Crear edificio nuevo</div> </Link>
                        </div>
                    </div>
                </div>


            </SidebarPage>


        </>
    )
};

export default ListadoEdificioAdm;