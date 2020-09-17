import React, { useEffect, useState } from 'react';


const DashboardSuperAdmin = (props) => {

    const getEdificiosData = async () => {
        const response = await fetch('http://127.0.0.1:5000/crearedificio');
        const data = await response.json()
        setEdificios(data)
        console.log(data)
    }
    useEffect(() => {
        getEdificiosData()
    }, [])

    const [edificios, setEdificios] = useState([])

    return (<>


        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 mt-5">
                <div className="col mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" onClick={() => {
                                console.log(edificios)
                            }}>Edificios</h5>
                            <ul className="p-0">
                                {edificios.map((edificio, index) => {
                                    return <li><span>{edificio.nombre_edificio}</span> <span>{edificio.direccion}</span> <span>{edificio.correo}</span></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Contratos</h5>
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

export default DashboardSuperAdmin;