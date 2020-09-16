import React from 'react';

const DashboardAdm = () => {
    return (
        <>
            
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="/">Logo</a>
                </nav>
            
            <div className="container">
                <div class="row row-cols-1 row-cols-md-2 mt-5">
                    <div class="col mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Cantidad Edificios</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Contratos</h5>
                                <ul>
                                    <li>Próximos a Vencer</li>
                                    <li>Vigentes</li>
                                    <li>Vencidos</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default DashboardAdm;