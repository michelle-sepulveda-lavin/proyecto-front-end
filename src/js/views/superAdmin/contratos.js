import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Contratos = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getEdificiosData()

    }, [])
    const filtradoPorVencer = () => {

        const porVencer = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            const mesContrato = fechaContrato.getMonth()
            const mesActual = store.currentDate.getMonth();
            const proximoVencer = (mesContrato - mesActual) <= 1 ? true : false;
            return (store.currentDate < fechaContrato && proximoVencer)
        })
        return porVencer
    }
    const filtradoVencido = () => {

        const vencido = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            return (fechaContrato < store.currentDate)
        })
        return vencido
    }
    const filtradoVigente = () => {

        const vigente = store.edificios.filter((contrato) => {
            const fechaContrato = new Date(contrato.termino_contrato)
            const mesContrato = fechaContrato.getMonth()
            const mesActual = store.currentDate.getMonth();
            const proximoVencer = (mesContrato - mesActual) <= 1 ? true : false;
            return (fechaContrato > store.currentDate && (proximoVencer === false))
        })
        return vigente
    }


    return (
        <>
            <SidebarPage>
                <h1 className="py-3 pl-3">Contratos</h1>
                <div className="container-fluid mb-4">
                    <h3 className="text-center">Próximos a vencer</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto overflow-auto">
                            <table class="table  border">
                                <thead class="btn-oscuro text-center">
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
                                    {store.edificios.length > 0 && filtradoPorVencer().map((edificio, index) => {


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
                                                            <span className="btn btn-azul" >Detalle</span> </Link> </td>
                                                </tr>
                                            </>)

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-center">Vencidos</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto overflow-auto">
                            <table class="table border">
                                <thead class="btn-oscuro text-center">
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
                                    {store.edificios.length > 0 && filtradoVencido().map((edificio, index) => {


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
                                                            <span className="btn btn-azul" >Detalle</span> </Link> </td>
                                                </tr>
                                            </>)

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-center">Vigentes</h3>
                    <div className="row">
                        <div className="col-12 col-md-9 mx-auto overflow-auto">
                            <table class="table border">
                                <thead class="btn-oscuro text-center">
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
                                    {store.edificios.length > 0 && filtradoVigente().map((edificio, index) => {


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
                                                            <span className="btn btn-azul" >Detalle</span> </Link> </td>
                                                </tr>
                                            </>)

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Link to="/dashboard" style={{ textDecoration: 'none' }} className="my-4"> <span className="boton-a-inicio shadow-sm ml-3"> <i className="fas fa-arrow-circle-left"></i> Ir a edificios</span> </Link>

            </SidebarPage>


        </>
    )
};

export default Contratos;