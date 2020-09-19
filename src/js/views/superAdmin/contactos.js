import React, { useContext } from 'react';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Contactos = () => {
    const { store, actions } = useContext(Context);

    const deleteContact = async (email) => {
        const response = await fetch(`http://127.0.0.1:5000/api/info-contacto/${email}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        actions.getContactData()
    }
    return (
        <SidebarPage>
            <h1 className="py-3 pl-3">Clientes a contactar</h1>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                        <table class="table table-responsive  border">
                            <thead class="thead-dark text-center">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Correo</th>
                                    <th scope="col">Interés</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store.contactos.length > 0 && store.contactos.map((contacto, index) => {
                                    if (index < 10) {

                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{contacto.name}</td>
                                                    <td>{contacto.email}</td>
                                                    <td>{contacto.plan}</td>
                                                    <td>{contacto.phone}</td>
                                                    <td>
                                                        <span className="btn btn-danger" onClick={() => {
                                                            deleteContact(contacto.email)
                                                        }}>Borrar</span></td>
                                                </tr>
                                            </>)
                                    }
                                })}
                            </tbody>
                        </table>
                        {store.contactos.length > 0 &&
                            <p>Hay {store.contactos.length > 10 ? store.contactos.length - 10 : ""} clientes más por contactar</p>}
                    </div>
                </div>
            </div>

        </SidebarPage>
    )
};

export default Contactos;