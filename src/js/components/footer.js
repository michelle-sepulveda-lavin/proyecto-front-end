import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="footer text-light">
                <div className="d-flex justify-content-between">
                    <div className="p-0 ml-2">
                        <div >Contacto: <br />
                        Telefono: +569 12345678 <br />
                        Email: edificio@felizfeliz.cl
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-twitter"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-facebook-f"></i></a>
                        <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <div className="">
                        <div className="p-3"><img className="img-fluid logo-footer" src="../edificos-felices-logo.png" alt="" /></div>
                    </div>

                </div>
            </div>

            {/* <footer className="footer py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-left">Copyright © Your Website 2020</div>
                        <div className="col-lg-4 my-3 my-lg-0">
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div className="col-lg-4 text-lg-right">
                            <a className="mr-3" href="#!">Privacy Policy</a>
                            <a href="#!">Terms of Use</a>
                        </div>
                    </div>
                </div>
            </footer> */}
        </>
    )
};

export default Footer;