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

            
        </>
    )
};

export default Footer;