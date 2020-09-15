import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDeletePlan from '../components/modalDeletePlan';


const ModifyPlans = () => {
    const getData = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/planes');
        const data = await response.json()
        setPlanes(data)
    }

    const [showModal, setShowModal] = useState(true)

    useEffect(() => {
        getData()
    }, []);

    const accountRol = "superAdmin"

    const [planes, setPlanes] = useState([
    ])


    const [plans, setPlans] = useState({
        name: "",
        price: "",
        body: [],
        frecuencia: ""
    })
    const [alert, setAlert] = useState("false")

    /*  const handleInput = e => {
         e.preventDefault();
         setNewContact({ ...newContact, [e.target.name]: e.target.value });
     }; */

    return (
        accountRol !== "superAdmin" ? <>

            <h1 className="text-center mt-5"> Parece que no tienes acceso a esta página! </h1>
            <Link to="./login" style={{ textDecoration: 'none' }}> <span className="boton-a-inicio shadow ml-4 mt-5"> <i className="fas fa-arrow-circle-left"></i> Login</span> </Link>

        </> : (
                <>

                    <img src="https://richardgarcia.net/wp-content/uploads/2019/02/zOOM-LOGOS-PNG.png" alt="logo" className="logo" />

                    <h1 className="text-center planes-titulo">NUESTROS PLANES</h1>

                    <div className="container my-5">

                        <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">


                            {planes.map((plans, index) => {

                                return (
                                    <div key={index} className="col-9 col-md-5 mb-5 plan">
                                        <div className="card h-md-100 shadow  border-0">

                                            <ModalDeletePlan show={showModal} />
                                            <div className="">


                                                <i
                                                    className="fas fa-trash-alt btn"

                                                />
                                            </div>


                                            <div className="card-body p-0">
                                                <div className=" d-flex justify-content-center align-items-center">
                                                    <div className="text-center">
                                                        <h3 className="card-title m-0">{plans.name}</h3>
                                                        <span className="plan-price">{plans.price}</span> <span className="tipo-moneda">/ UF</span>
                                                        <h5 className="mb-3"> Pagado {plans.frecuencia}</h5>

                                                    </div>
                                                </div>


                                                {plans.body.map((items, index) => {
                                                    return <li key={index} className="text-center p-3"> <span className="px-2 px-md-4">{items}</span></li>
                                                })}



                                            </div>
                                        </div>

                                    </div>
                                )

                            })}


                        </div>
                        <Link to="./" style={{ textDecoration: 'none' }}> <span className="boton-a-inicio shadow"> <i className="fas fa-arrow-circle-left"></i> Ir al inicio</span> </Link>
                    </div>
                </>
            )
    )
};

export default ModifyPlans;