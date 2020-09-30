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
                    <div className="">
                        <div className="p-3"><img className="img-fluid logo-footer" src="../edificos-felices-logo.png" alt="" /></div>
                    </div>

                </div>
            </div>
        </>
    )
};

export default Footer;