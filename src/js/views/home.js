import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';

const Home = () => {
    const { store, actions } = useContext(Context);
    const history = useHistory();

    return (
        <>
            {/* navbar */}
            <nav className="navbar navbar-color navbar-light navbar-expand-lg navbar-light bg-light">

                <div className="d-md-flex justify-content-between w-100 text-center">
                    <Link className="navbar-brand ml-2 float-left" to={"./"}>Logo</Link>

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
            </nav>
            {/* navbar end */}
            <div className="container">
                {/* first card */}
                <div className="card mb-3 mt-5">
                    <div className="row no-gutters">
                        <div className="col-md-6">
                            <img src="https://picsum.photos/600/400?random=1" className="card-img" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body text-center">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident beatae error a iste eius dolorum quam itaque sapiente placeat qui explicabo vitae, officia totam eligendi cupiditate. Maiores corporis tenetur ipsam?</p>
                                <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident beatae error a iste eius dolorum quam itaque sapiente placeat qui explicabo vitae, officia totam eligendi cupiditate. Maiores corporis tenetur ipsam?</p>

                            </div>
                        </div>
                    </div>
                </div>
                {/* first card end */}

                {/* second card */}
                <div className="card-deck mt-5">
                    <div className="card">
                        <img src="https://picsum.photos/600/400?random=2" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://picsum.photos/600/400?random=3" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src="https://picsum.photos/600/400?random=4" className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>
                    </div>
                </div>
                {/* second card end */}
            </div>
        </>
    )
};

export default Home;