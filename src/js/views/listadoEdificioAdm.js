import React from 'react';

const ListadoEdificioAdm = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Logo</a>
            </nav>
            <div className="text-center mt-5">
                <h1>Listado Edificios</h1>
            </div>
            <div className="container">
                <div className="card mt-5">
                    <div className="row">
                        <div className="col-sm">
                            <div className="card-body">
                                <h5 className="card-title">Nombre Edificio</h5>
                                <ul className="list-group">
                                    <div className="col">
                                        <li className="list-group-item">Cras justo odio</li>
                                        <li className="list-group-item">Dapibus ac facilisis in</li>
                                        <li className="list-group-item">Morbi leo risus</li>
                                        <li className="list-group-item">Porta ac consectetur ac</li>
                                        <li className="list-group-item">Vestibulum at eros</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                <h5 className="card-title">Nombre Administrador</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Cras justo odio</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Morbi leo risus</li>
                                    <li className="list-group-item">Porta ac consectetur ac</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                <h5 className="card-title">Dirección</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Cras justo odio</li>
                                    <li className="list-group-item">Dapibus ac facilisis in</li>
                                    <li className="list-group-item">Morbi leo risus</li>
                                    <li className="list-group-item">Porta ac consectetur ac</li>
                                    <li className="list-group-item">Vestibulum at eros</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>




            <div className="container">
                <div className="card">
                    <div className="row">
                        <div className="col-sm">
                            <div className="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card-body">
                                This is some text within a card body.
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card-group">
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>











        </>
    )
};

export default ListadoEdificioAdm;