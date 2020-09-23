import React, { useState } from 'react';
import BoletinTable from '../components/BoletinTable';
import { v4 as uuidv4 } from 'uuid';
import AddBoletin from '../components/AddBoletin';
import EditBoletin from '../components/EditBoletin';


const BoletinAdm = () => {

    const boletinData = [
        { id: uuidv4(), asunto: 'Corte de energia 1', body: 'lorem1' },
        { id: uuidv4(), asunto: 'Corte de energia 2', body: 'lorem2' },
        { id: uuidv4(), asunto: 'Corte de energia 3', body: 'lorem3' },
    ]

    const [boletin, setBoletin] = useState(boletinData);

    const addboletin = (add_boletin) => {
        add_boletin.id = uuidv4()
        setBoletin([
            ...boletin,
            add_boletin
        ])
    }

    const deleteboletin = (id) => {
        console.log(id)

        setBoletin(boletin.filter(add_boletin => add_boletin.id !== id))

    }

    const [editing, setEditing] = useState(false)

    const [currentBoletin, setCurrentBoletin] = useState({
        id: null, name: '', username: ''
    });

    const editRow = (edit_boletin) => {
        setEditing(true);
        setCurrentBoletin({
            id: edit_boletin.id, asunto: edit_boletin.asunto, body: edit_boletin.body
        })
    }

    const updateBoletin = (id, updateBoletin) => {
        setEditing(true);
        setBoletin(boletin.map(add_boletin => (add_boletin.id === id ? updateBoletin : add_boletin)))
    }

    return (
        <>
            <div className="container">

                <div className="flex-row">
                    <div className="flex-large">

                        {
                            editing ? (
                                <div>
                                    <h2>Editar Boletin</h2>
                                    <EditBoletin
                                        currentBoletin={currentBoletin}
                                        updateBoletin={updateBoletin}
                                    />
                                </div>
                            ) : (
                                    <div>
                                        <h2>Agregar Boletin</h2>
                                        <AddBoletin addboletin={addboletin} />
                                    </div>
                                )
                        }

                    </div>
                    <div className="flex-large">
                        <h2>Boletines</h2>
                        <BoletinTable
                            boletin={boletin}
                            deleteboletin={deleteboletin}

                            editRow={editRow} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default BoletinAdm;