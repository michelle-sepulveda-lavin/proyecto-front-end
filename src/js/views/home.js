import React from 'react';

const Home = () => {
    return (
        <>
            {/* navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand ml-2" href="/">Logo</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <a className="nav-link " href="/">Edificios Felices<span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <a className="btn btn-outline-success mr-1" href="/" role="button">Iniciar sesión</a>
                        <a className="btn btn-outline-success" href="/" role="button">Planes</a>
                    </form>
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