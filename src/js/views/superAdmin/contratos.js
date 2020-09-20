import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Contratos = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            <SidebarPage>
                <h1 className="py-3 pl-3">Contratos</h1>
                <div className="container-fluid mb-4">
                    <h3 className="text-center">Próximos a vencer</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto">
                            <table class="table table-responsive  border">
                                <thead class="thead-dark text-center">
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
                                    {store.edificios.length > 0 && store.contratos.porVencer.map((edificio, index) => {
                                        if (index < 10) {

                                            return (
                                                <>
                                                    <tr>
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
                                                </>)
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-center">Vencidos</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto">
                            <table class="table table-responsive  border">
                                <thead class="thead-dark text-center">
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
                                    {store.edificios.length > 0 && store.contratos.vencidos.map((edificio, index) => {
                                        if (index < 10) {

                                            return (
                                                <>
                                                    <tr>
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
                                                </>)
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-center">Vigentes</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto">
                            <table class="table table-responsive  border">
                                <thead class="thead-dark text-center">
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
                                    {store.edificios.length > 0 && store.contratos.vigentes.map((edificio, index) => {
                                        if (index < 10) {

                                            return (
                                                <>
                                                    <tr>
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
                                                </>)
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </SidebarPage>


        </>
    )
};

export default Contratos;