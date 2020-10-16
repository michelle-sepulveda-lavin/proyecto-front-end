import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const Home = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-dark fixed-top " id="mainNav">

                <Link className="navbar-brand ml-2 float-left" to={"./"}><img src="../edificos-felices-logo.png" className="logo-home"></img></Link>
                <button className="navbar-toggler navbar-toggler-right text-dark" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ml-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        {/* <li className="nav-item"><a className="nav-link text-white" href="#services">Services</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#portfolio">Portfolio</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#about">About</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#team">Team</a></li>
                        <li className="nav-item"><a className="nav-link text-white" href="#contact">Contact</a></li> */}
                        <Link className="btn btn-azul text-white mr-3" to="./planes" role="button">Planes</Link>

                        {
                            !!store.currentRol ?
                                <>

                                    <Link to="/dashboard" className=" btn btn-verde mr-3" role="button">Dashboard</Link>


                                    <Link to="/" className=" btn btn-secondary mr-3" onClick={() => actions.handleClose(history)}> <i className="fas fa-power-off mr-3"></i>Cerrar sesion</Link>

                                </>
                                :

                                <Link to="/login" className=" btn btn-verde mr-3" role="button">Iniciar sesión</Link>

                        }
                    </ul>
                </div>

            </nav>











            {/* navbar */}
            {/* <nav className="navbar navbar-color navbar-light navbar-expand-lg navbar-light bg-light">

                <div className="d-md-flex justify-content-between w-100 text-center">
                    <Link className="navbar-brand ml-2 float-left" to={"./"}><img src="../edificos-felices-logo.png" className="logo-home" alt=""></img></Link>

                    <span className="titulo-navbar align-self-center font-weight-bold ">Edificios Felices</span>
                    <div className="d-inline float-right">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav mr-0 mt-2 mt-lg-0 text-center text-md-left float-right">
                                <li className="d-block mr-2">
                                    <Link className="btn btn-outline-dark" to="./planes" role="button">Planes</Link>

                                </li>
                                {
                                    !!store.currentRol ?
                                        <>
                                            <li className="d-block">
                                                <Link to="/dashboard" className=" btn btn-success mr-1" role="button">Dashboard</Link>
                                            </li>
                                            <li className="d-block" >
                                                <Link to="/" className=" btn btn-secondary mr-1" onClick={() => actions.handleClose(history)}> <i className="fas fa-power-off mr-2"></i>Cerrar sesion</Link>
                                            </li>
                                        </>
                                        :
                                        <li className="d-block">
                                            <Link to="/login" className=" btn btn-outline-dark mr-1" role="button">Iniciar sesión</Link>
                                        </li>
                                }


                            </ul>
                        </div>
                    </div>
                </div>
            </nav> */}
            {/* navbar end */}





            <header className="masthead">
                <div className="container">
                    <h1 className="masthead-subheading">Mejora tu productividad</h1> <br />
                    <h5 className="masthead-heading text-uppercase">La mejor aplicación para la Administración de <br /> Edificios y Condominios</h5> <br />
                    <div className="d-flex justify-content-center">
                        <a className="btn btn-azul text-white btn-xl text-uppercase" href="./planes"> nuestros planes</a>
                        <a className="btn bg-db-2 text-white ml-3 d-inline-block btn-xl text-uppercase" href="#services"> Nuestros Servicios</a>
                    </div>
                </div>
            </header>


            <section className="page-section pt-5 mt-1" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Servicios</h2>
                        <h3 className="section-subheading text-muted">Nos destacamos con:</h3>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle rounded-circle fa-stack-2x text-gradient"></i>
                                <i className="fas fa-handshake  circle fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Gastos Comunes</h4>
                            <p className="text-muted">Registra los ingresos y egresos para calcular los gastos comunes de forma automática, subiendo incluso archivos de respaldo, con el plus de notificar mediante correo a usuarios cuando estén o no cancelados.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-success"></i>
                                <i className="far fa-list-alt  circle fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Boletines</h4>
                            <p className="text-muted">La utilidad del boletín informativo radica en la difusión de información, noticias, actividades, eventos, sucesos o acontecimientos que tengan que ver con el edificio o condominio.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-stack-2x "></i>
                                <i className="fas fa-boxes circle fa-stack-1x fa-inverse"></i>
                            </span>
                            <h4 className="my-3">Paqueteria</h4>
                            <p className="text-muted">Logra una comunicación más fluida con los residentes al momento que llegue un producto y este sea entregado en conserjería, mediante notificaciones por plataforma.</p>
                        </div>
                    </div>
                </div>
            </section>





        </>
    )
};

export default Home;