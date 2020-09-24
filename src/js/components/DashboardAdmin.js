import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';


const DashboardAdmin = (props) => {
    const { store } = useContext(Context)
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">

                <div className="col  col-md-6 border rounded-lg row p-3 justify-content-center">
                    <div className="">
                        <h3>Conserjes Activos</h3>

                    </div>

                    {store.conserjes.length > 0 &&
                        store.conserjes.map((conserje, index) => {
                            if (conserje.estado === true) {
                                return (

                                    <div class="card mb-4 p-2 prueba shadow-sm ">
                                        <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                                            <div className="w-75 d-flex align-items-center" >

                                                <div className="d-flex align-items-center  flex-column">  <img src="../user.png" className="img-fluid w-40" />
                                                    <div className="text-center">
                                                        <h3>{conserje.nombre}</h3>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="w-75 conserjes-activos">

                                                <ul className="p-0">

                                                    <li><strong>Teléfono: </strong>{conserje.telefono}</li>
                                                    <li className="mt-md-2"><strong>Email: </strong>{conserje.usuario.email}</li>
                                                    <li className="mt-md-2"><strong>Turno: </strong>{conserje.turno}</li>

                                                </ul>

                                            </div>

                                        </div>
                                    </div>


                                )
                            }
                        })



                    }

                    <Link to="/conserjes"><button className="btn btn-dashboard text-light"> Ver todos</button></Link>

                </div>
                <div className="col-12 col-md-6">

                </div>

            </div>














        </div>
    )
};

export default DashboardAdmin;