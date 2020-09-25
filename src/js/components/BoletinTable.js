import React, {useState, useEffect} from 'react';

const BoletinTable = (props) => {
    // console.log(props.boletin)

    const [data, setData] = useState([])
    const url = 'http://localhost:5000'

    useEffect(() => {
        fetchData()
    }, [])
    
    const fetchData = async () => {
        const response =  await fetch(`${url}/boletin`)
        const data = await response.json()
        if (data.msg){
            alert(data.msg)
        }
        else {
            setData(data)
        }
        
    }


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
                        data.length > 0 ?
                            data.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{data.asunto}</td>
                                    <td>{data.body}</td>
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