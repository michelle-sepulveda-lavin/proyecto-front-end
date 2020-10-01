import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel'

const DashboardUser = (props) => {
    const { store, actions } = useContext(Context)
    const userID = JSON.parse(localStorage.getItem("departamento"))
    const filtradoHabitado = () => {
        const habitados = store.departamentoUsuarios.filter((dpto) => {
            return dpto.estado == "habitado"
        })
        return habitados
    }
    const filtradoDeshabitado = () => {
        const deshabitados = store.departamentoUsuarios.filter((dpto) => {
            return dpto.estado == "deshabitado"
        })
        return deshabitados
    }
    const gastoCLP = (numero) => {
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'CLP' }
        ).format(numero)
    }
    const [gastoActual, setGastoActual] = useState(null)

    const getGastosDeptoActual = async () => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const userID = JSON.parse(localStorage.getItem("departamento"))
        const edificioID = user.user.edificio.id
        const resp = await fetch(`${store.apiURL}/gastoscomunes/depto/${edificioID}/${userID}`)
        const data = await resp.json()
        console.log(data)
        if (resp.ok) {
            setGastoActual(data.filter((meses) => {
                const q = new Date()
                const mes = q.getMonth();
                const year = q.getFullYear();
                return meses.month === mes && meses.year === year && (meses.estado === "noPagado" || meses.estado === "revision")
            }))
        }

    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio.id
        actions.getEdificioCompleto()
        getGastosDeptoActual()
        actions.getBoletines(edificioID)
        actions.getDepartamentoActualInfo()
        actions.getPaqueteriaUsuario()
        actions.getDepartamentoActualUsuario()
        actions.getConserjes(edificioID)
    }, [])

    const filtroBoletin = () => {

        const activos = store.all_boletin.filter((boletin) => {
            return boletin.estado === true
        })
        return activos
    }

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="container-fluid">
            <h1 className="text-center mt-3 mb-5">Departamento {userID} </h1>



            <div className="row row-cols-1 row-cols-md-2 justify-content-center">
                <div className="col mb-4">
                    <div className=" card h-100 shadow-sm bg-dashboard border rounded">



                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12 mb-4 text-center text-md-left">
                                    <h2>Boletines</h2>
                                </div>

                                {filtroBoletin().length > 0 ?
                                    <Carousel className="text-dark px-4">
                                        {filtroBoletin().map((boletin, index) => {
                                            return (
                                                < Carousel.Item key={index} >
                                                    <img
                                                        className="d-block w-100 rounded min-h-20"
                                                        src={`../gris2.jpg`}
                                                        alt="slide"
                                                    />
                                                    <Carousel.Caption>
                                                        <h5 className="mb-md-4 text-body">{boletin.asunto}</h5>

                                                    </Carousel.Caption>
                                                </Carousel.Item>

                                            )
                                        })}
                                    </Carousel>
                                    :
                                    <h3 className="text-center">No hay boletines en este momento</h3>
                                }


                            </div>

                            <div className="d-flex justify-content-end mr-2">
                                <Link to={"/boletines"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col mb-4">
                    <div className=" card h-100 shadow-sm bg-dashboard border rounded">



                        <div className="card-body conserjes-turno ">
                            <div className="row mb-2">
                                <div className="col-12 mb-2 text-center text-md-left">
                                    <h2>Conserjes de Turno</h2>
                                </div>

                                <ul className="list-group list-group-horizontal card-carousel text-center mx-md-5  p-2">
                                    {store.conserjes.length > 0 &&
                                        store.conserjes.map((conserje, index) => {
                                            if (conserje.estado === true) {
                                                return (
                                                    <>
                                                        <li className="">
                                                            <div className="card shadow-sm text-body text-left row mr-2">
                                                                <div className="col-12  d-flex justify-content-center">
                                                                    <img class="conserje-img" src={"../user.png"}></img>
                                                                </div>
                                                                <div className="col-12 col-md-8 px-2">
                                                                    <ul className="pl-0 mb-0">
                                                                        <li className="card-title"> <i class="fas fa-user-check"></i>  <strong>Nombre:</strong> {conserje.nombre}</li>
                                                                        <li> <i className="fas fa-phone mr-1 mb-2"> </i> <strong>Teléfono: </strong>

                                                                            {conserje.telefono}</li>
                                                                        <li><i className="far fa-clock mr-2 mb-2"></i><strong>Turno:</strong>  {conserje.turno}</li>

                                                                    </ul>
                                                                </div>
                                                            </div>

                                                        </li>

                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </ul>

                            </div>


                        </div>

                    </div>
                </div>
                <div className="col mb-2">
                    <div className=" card h-100 shadow-sm  border rounded">

                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-12  text-center text-md-left">
                                    <h2>Paquetes en conserjería</h2>
                                </div>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 mb-4  d-flex justify-content-center">
                                <div className="col h-100 pt-md-3">
                                    <div className="card shadow-sm p-4 bg-db-4 ">

                                        <div className="d-flex justify-content-center ">
                                            <span className="ml-md-1 d-flex align-items-center justify-content-center btn-db-4 shadow-sm ">
                                                <p className="pt-3">{!!store.paqueteriaUsuario ? store.paqueteriaUsuario.length : "0"}</p>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>
                </div>

                <div className="col mb-2">
                    <div className=" card h-100  mb-4 shadow-sm bg-dashboard border rounded">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-12 mb-2 text-center text-md-left">
                                    <h2>Gastos Comunes del Mes</h2>
                                </div>
                            </div>
                            <div className="row mb-4 justify-content-center">
                                <div className="col-11 col-md-8 h-100 ">
                                    <div className="card shadow-sm p-3 bg-db-2">

                                        <div className="font-bigger py-3">
                                            <div>
                                                <p className="pt-2 text-light text-center">{!!gastoActual && gastoActual.length > 0 ? (gastoActual[0].estado === "revision" ? <p className="">El pago está pendiente de revisión</p> : gastoActual[0].estado === "noPagado" ? <p> {gastoCLP(gastoActual[0].monto)}</p> : "") : "No hay gastos pendientes este mes"}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div className="d-flex justify-content-end">
                                <Link to={"/usuario/gastos-comunes"} style={{ textDecoration: 'none', color: "#ffffff" }} className="btn btn-dashboard mt-2">Ver detalle </Link>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
};

export default DashboardUser;