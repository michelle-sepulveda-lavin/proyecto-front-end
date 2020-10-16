import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Contactos = () => {
    const { store, actions } = useContext(Context);

    const contactado = async (email) => {
        const response = await fetch(`${store.apiURL}/api/info-contacto/${email}`, {
            method: "PATCH",
            body: JSON.stringify({
                state: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        actions.getContactData()
    }
    useEffect(() => {
        actions.getContactData()

    }, [])

    return (
        <SidebarPage>

            <h1 className="py-3 pl-3">Clientes a contactar</h1>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12 col-md-8 mx-auto overflow-auto ">
                        <table className="table table-hover table-bordered border">
                            <thead className="btn-oscuro text-center">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Interés</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.contactos.length > 0 && store.contactos.map((contacto, index) => {
                                    if (index < 10 && contacto.state === true) {

                                        return (
                                            <tr key={index}>
                                                <th scope="row">{contacto.id}</th>
                                                <td>{contacto.name}</td>
                                                <td>{contacto.email}</td>
                                                <td>{contacto.plan}</td>
                                                <td>{contacto.phone}</td>
                                                <td>
                                                    <span className="btn btn-azul" onClick={() => {
                                                        contactado(contacto.email)
                                                    }}>Contactado</span></td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/contactados"><span className="btn btn-verde ">Contactos archivados</span> </Link>
                </div>
            </div>

        </SidebarPage>
    )
};

export default Contactos;