import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Planes = () => {
    const getData = async () => {
        const response = await fetch('http://127.0.0.1:5000/api/planes');
        const data = await response.json()
        setPlanes(data)
    }
    useEffect(() => {
        getData()
    }, []);


    const [planes, setPlanes] = useState([
    ])


    const [newContact, setNewContact] = useState({
        name: "",
        phone: "",
        email: "",
        plan: ""
    })
    const [alert, setAlert] = useState("false")

    const handleInput = e => {
        e.preventDefault();
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    return (
        <>

            <img src="https://richardgarcia.net/wp-content/uploads/2019/02/zOOM-LOGOS-PNG.png" alt="logo" className="logo" />

            <h1 className="text-center planes-titulo">NUESTROS PLANES</h1>

            <div className="container my-5">

                <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">


                    {planes.map((plans, index) => {

                        return (
                            <div key={index} className="col-9 col-md-5 mb-5 plan">
                                <div className="card h-md-100 shadow  border-0">

                                    <div className="card-body p-0">
                                        <div className="plan-header d-flex justify-content-center align-items-center">
                                            <div className="text-center">
                                                <h3 className="card-title m-0">{plans.name}</h3>
                                                <span className="plan-price">{plans.price}</span> <span className="tipo-moneda">/ UF</span>
                                                <h5 className="mb-3"> Pagado {plans.frecuencia}</h5>
                                                {planes.indexOf(plans) === planes.length - 1 &&
                                                    <span className="boton-preferido p-3 shadow" data-toggle="modal" data-target="#modal-suscripcion" onClick={() => {
                                                        setNewContact({ ...newContact, plan: plans.name });
                                                    }}>¡LO QUIERO!</span>
                                                }
                                            </div>
                                        </div>

                                        {/* ******MODAL***** */}

                                        <div className="modal fade" id="modal-suscripcion" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Ingresa tus datos y te contactaremos</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <form onSubmit={(e) => {
                                                            e.preventDefault()
                                                            const values = Object.values(newContact)
                                                            if (values.includes("")) {
                                                                setAlert("missing")
                                                            }
                                                            else {
                                                                setAlert("completed")
                                                                setTimeout(() => { window.location.reload() }, 2000);
                                                            }

                                                        }}>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Nombre completo</label>
                                                                <input required type="text" name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                                                    value={newContact.name} onChange={handleInput}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Teléfono</label>
                                                                <input required type="number" name="phone" className="form-control" id="exampleInputPassword1" value={newContact.phone}
                                                                    onChange={handleInput}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Email</label>
                                                                <input required type="email" name="email" className="form-control" id="exampleInputPassword1" value={newContact.email}
                                                                    onChange={handleInput} />
                                                            </div>
                                                            <div className={"alert alert-danger " + (alert === "missing" ? "d-block" : "d-none")} role="alert">
                                                                ¡Por favor completa todos los datos!
                                                            </div>
                                                            <div className={"alert alert-success " + (alert === "completed" ? "d-block" : "d-none")} role="alert">
                                                                ¡Te contactaremos lo antes posible!
                                                            </div>

                                                            <button type="submit" className="btn btn-lg btn-success">Enviar solicitud </button>




                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ******MODAL***** */}

                                        {plans.body.map((items, index) => {
                                            return <li key={index} className="text-center p-3"> <span className="px-2 px-md-4">{items}</span></li>
                                        })}

                                        <div className="price-div">
                                            <span className="boton-no-preferido p-3 shadow " data-toggle="modal" data-target="#modal-suscripcion" onClick={() => {
                                                setNewContact({ ...newContact, plan: plans.name })
                                            }}>¡LO QUIERO!</span>
                                        </div>

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
};

export default Planes;