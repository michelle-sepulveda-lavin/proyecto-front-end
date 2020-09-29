import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Contactados = () => {
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
/*     const noContactado = async (email) => {
        const response = await fetch(`http://127.0.0.1:5000/api/info-contacto/${email}`, {
            method: "PATCH",
            body: JSON.stringify({
                state: true
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        const data = await response.json()
        console.log(data)
        actions.getContactData()
    } */
    const includes = store.contactos.map((contacto) => {
        if (Object.values(contacto).includes(false)) {
            return false
        } else {
            return true
        }

    })

    useEffect(() => {
        actions.getContactData()

    },[])
    return (
        <SidebarPage>

            <h1 className="py-3 pl-3" onClick={() => {
                console.log(includes)


            }}>Clientes contactados</h1>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12 col-md-7 mx-auto">
                        <table className="table  border">
                            {includes.includes(false) &&
                                <thead className="thead-dark text-center w-100">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Correo</th>
                                        <th scope="col">Interés</th>
                                        <th scope="col">Teléfono</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>


                            }
                            <tbody className="text-center">

                                {store.contactos.length > 0 && store.contactos.map((contacto, index) => {
                                    if (index < 10 && contacto.state === false) {

                                        return (

                                            <tr key={index}>
                                                <th scope="row">{contacto.id}</th>
                                                <td>{contacto.name}</td>
                                                <td>{contacto.email}</td>
                                                <td>{contacto.plan}</td>
                                                <td>{contacto.phone}</td>
                                                <td>
                                                    <span className="btn btn-danger" onClick={() => {
                                                        deleteContact(contacto.email)
                                                    }}>Borrar</span></td>
                                            </tr>
                                        )
                                    }
                                })}
                                {
                                    !includes.includes(false) &&

                                    <tr>
                                        <th>No hay mensajes archivados</th>
                                    </tr>


                                }

                            </tbody>
                        </table>
                        {includes.includes(false) &&
                            <div className="d-flex justify-content-center">
                                <span className="btn btn-danger px-5" onClick={() => {
                                    store.contactos.map((contacto) => {
                                        /* if (contacto.state === false) {
                                            deleteContact(contacto.email)
                                        } */
                                        contacto.state === false &&
                                        deleteContact(contacto.email)
                                    })
                                }}>Borrar Todos</span>
                            </div>
                        }
                    </div>

                </div>

            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="m-auto pb-5">
                        <Link to="/contactos" style={{ textDecoration: 'none' }}>
                            <span className="boton-a-inicio shadow bg-white">
                                <i className="fas fa-arrow-circle-left bg-white"></i> Atras
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </SidebarPage>
    )
};

export default Contactados;