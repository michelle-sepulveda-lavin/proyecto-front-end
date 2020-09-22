import React from 'react';

const BoletinTable = (props) => {
    console.log(props.boletin)

    return (
        <>
            <table>
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
                            props.boletin.map(boletin => (
                                <tr key={boletin.id}>
                                    <td>{boletin.asunto}</td>
                                    <td>{boletin.body}</td>
                                    <td>
                                        <button className="button muted-button"
                                        onClick={
                                            () => {props.editRow(boletin)}
                                        }
                                        >Edit</button>
                                        <button className="button muted-button"
                                        onClick={() => {props.deleteboletin(boletin.id)}}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )) 
                            : 
                            (
                                <tr>
                                    <td colSpan={3}>No users</td>
                                </tr>
                            )    
                    }

                </tbody>
            </table>
        </>
    )
};

export default BoletinTable;