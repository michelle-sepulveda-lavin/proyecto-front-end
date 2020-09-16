import React from 'react';

const MenuNavegacion = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">Logo</a>
            </nav>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mb-3 mt-5" >
                        <div className="card-header">Menu Navegación</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title"><i className="fas fa-align-justify"></i> Dashboard </h5>
                            <h5 className="card-title"><i className="far fa-building"></i> Creacion Edificios </h5>
                            <h5 className="card-title"><i className="far fa-building"></i> Edificios </h5>
                            <h5 className="card-title"><i className="fas fa-user-cog"></i><a href="/" > Perfil</a> / <a href="/" >Logout</a></h5>

                        </div>
                    </div>
                </div>
            </div>



        </>
    )
};

export default MenuNavegacion;