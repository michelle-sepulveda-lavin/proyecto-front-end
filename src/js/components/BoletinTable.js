import React, {useState, useEffect} from 'react';

const BoletinTable = (props) => {
    // console.log(props.boletin)

    const [data, setData] = useState([])
    const url = 'http://localhost:5000'

    useEffect(() => {
        
        const fetchData = async () => {
            await fetch(`${url}/boletin`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.log(error))
        }
        
        fetchData()
    }, [])
    

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Asunto</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.boletin.length > 0 ?
                            props.boletin.map((boletin, index) => (
                                <tr key={boletin.id}>
                                    <td>{boletin.asunto}</td>
                                    <td>{boletin.body}</td>
                                    <td>
                                        {/* <button className="button muted-button"
                                        onClick={
                                            () => {props.editRow(boletin)}
                                        }
                                        >Edit</button>
                                        <button className="button muted-button"
                                        onClick={() => {props.deleteboletin(boletin.id)}}
                                        >Delete</button> */}
                                        <div className="custom-control custom-switch">
                                            <input type="checkbox" className="custom-control-input" id={"customSwitch"+index} />
                                            <label className="custom-control-label" htmlFor={"customSwitch"+index}>Activo</label>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            :
                            (
                                <tr>
                                    <td colSpan={3}>No hay boletines</td>
                                </tr>
                            )
                    }

                </tbody>
            </table>
        </>
    )
};

export default BoletinTable;