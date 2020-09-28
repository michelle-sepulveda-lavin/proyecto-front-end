import React, { useContext, useEffect, useState } from 'react';
import BorrarConserje from '../../components/modalBorrarConserje';
import ModalCrearConserje from '../../components/modalCrearConserje';
import SidebarPage from '../../components/SidebarPage';
import { Context } from '../../store/appContext';

const Conserjes = () => {
    const [show, setShow] = useState(false)
    const { store, actions } = useContext(Context)
    const [borrar, setBorrar] = useState(false)
    const [idBorrar, setIdBorrar] = useState("")
    const [idToModify, setIdToModify] = useState("");
    const [modify, setModify] = useState(false);
    const [estadoConserje, setEstadoConserje] = useState(null)
    const handleChangeFiltro = (e) => {
        setFiltroTurno(e.target.value)
    }
    const [conserjeModificado, setConserjeModificado] = useState({
        nombre: "",
        telefono: "",
        turno: "",
        avatar: ""
    })
    const handleInputConserje = (e) => {
        setConserjeModificado({ ...conserjeModificado, [e.target.name]: e.target.value })
    }
    const handleAvatar = (e) => {
        const file = e.target.files[0]
        setConserjeModificado({
            ...conserjeModificado, [e.target.id]: file
        })
    }
    const changeConserje = async (id, conserje) => {
        const formData1 = new FormData()
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio
        if (conserje.nombre !== undefined && conserje.nombre !== "") {
            formData1.append("nombre", conserje.nombre)
        }
        if (conserje.telefono !== undefined && conserje.telefono !== "") {
            formData1.append("telefono", conserje.telefono)
        }
        if (!!conserje.turno !== undefined && conserje.turno !== "") {
            formData1.append("turno", conserje.turno)
        }
        if (conserje.avatar !== undefined && conserje.avatar !== "") {
            formData1.append("avatar", conserje.avatar)
        }
        try {
            const response = await fetch(`${store.apiURL}/conserjes/${id}`, {
                method: "PATCH",
                body: formData1,
                headers: {}
            })
            const data = await response.json()
            console.log(data)
            actions.getConserjes(edificioID)

        }

        catch (error) {
            console.log(error)
        }
    }
    const [filtroTurno, setFiltroTurno] = useState("Todos")
    const [filtroEstado, setFiltroEstado] = useState("Todos")

    useEffect(() => {

        window.scrollTo(0, 0)
        const user = JSON.parse(localStorage.getItem("currentUser"))
        const edificioID = user.user.edificio
        actions.getConserjes(edificioID)
    }, [])

    return (
        <SidebarPage>
            <h1 className="mt-4">Conserjes</h1>
            <div className="container">
                <div className="d-flex justify-content-end" onClick={() => {
                    setShow(true)
                }}><button className="btn btn-success">Crear Conserje</button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    Filtrar por turno
                    <select defaultValue={"Todos"} className="ml-3" onChange={handleChangeFiltro}>
                        <option value="Todos"> Todos</option>
                        <option value="Mañana">Turno Mañana</option>
                        <option value="Tarde">Turno Tarde</option>
                        <option value="Noche">Turno Noche</option>

                    </select>

                </div>

                <div className="mt-4">


                    {store.conserjes.length <= 0 &&
                        <h2 className="text-center mt-5">No hay conserjes creados</h2>

                    }
                    <div className="row row-cols-1 row-cols-md-3 container d-flex justify-content-center">
                        {store.conserjes.length > 0 &&

                            store.conserjes.map((conserje, index) => {
                                const checked = conserje.estado === true ? "checked" : ""
                                let estado_conserje = conserje.estado
                                if (filtroTurno === conserje.turno || filtroTurno === "Todos")
                                    return (

                                        <div key={index} className="col mb-4">

                                            <div className="card rounded shadow-sm h-100">


                                                <div className="text-right icons-conserje">
                                                    <i className="far fa-edit text-right pr-2 pt-1" onClick={() => {
                                                        setIdToModify(conserje.id)
                                                        if (!modify) {
                                                            setModify(true)
                                                        } else {
                                                            setModify(false)
                                                        }
                                                    }}></i>
                                                    <i className="far fa-trash-alt text-right pr-2 pt-1" onClick={() => {
                                                        setIdBorrar(conserje.id)
                                                        setBorrar(true)
                                                    }}></i>
                                                </div>
                                                <div className="fondo-avatar"></div>
                                                <div className="d-flex justify-content-center header-conserje p-3">
                                                    <div className="avatar-img shadow-sm">
                                                        <img src={`${store.apiURL}/avatares/${conserje.avatar}`} className="card-img-top" alt={conserje.name} />
                                                    </div>


                                                </div>
                                                {modify && idToModify === conserje.id &&
                                                    <input className="pl-4" type="file" accept="image/*" id="avatar" onChange={(e) => {
                                                        handleAvatar(e)
                                                        console.log(e.target.files[0])
                                                    }} />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title text-center"><strong>
                                                        {modify && idToModify === conserje.id ?
                                                            (<input className="d-inline" defaultValue={conserje.nombre} name="nombre" onChange={handleInputConserje} />) :
                                                            conserje.nombre}</strong></h5>
                                                    <ul className="pl-0 mb-0 border-top border-info pt-3">
                                                        <li> <i className="fas fa-phone mr-1 mb-2"> </i> <strong>Teléfono: </strong>
                                                            {modify && idToModify === conserje.id ?
                                                                (<input className="d-inline" defaultValue={conserje.telefono} name="telefono" onChange={handleInputConserje} />) :
                                                                (conserje.telefono)}</li>
                                                        <li><i className="far fa-clock mr-2 mb-2"></i><strong>Turno:</strong>  {modify && idToModify === conserje.id ?
                                                            (<select className="d-inline" defaultValue={conserjeModificado.turno} name="turno" onChange={handleInputConserje}>
                                                                <option value="default" disabled>Seleccionar</option>
                                                                <option value="Mañana">Mañana</option>
                                                                <option value="Tarde">Tarde</option>
                                                                <option value="Noche">Noche</option>

                                                            </select>) : conserje.turno} </li>


                                                        <li><i className="far fa-user mr-2"></i><strong>Usuario: </strong>  {conserje.usuario.username}</li>
                                                        <li> <span className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id={"customSwitch" + index} defaultChecked={checked} />
                                                            <label className="custom-control-label" htmlFor={"customSwitch" + index} onClick={() => {

                                                                if (conserje.estado === false) {
                                                                    estado_conserje = true
                                                                } else {
                                                                    estado_conserje = false
                                                                }
                                                                actions.cambiarEstadoConserje(conserje.id, estado_conserje)
                                                            }}>{conserje.estado === false ? "Inactivo" : "Activo"}</label>
                                                        </span></li>
                                                    </ul>

                                                </div>
                                                {modify && idToModify === conserje.id && (<div className="d-flex justify-content-center pb-3"> <div> <button className="btn btn-secondary" onClick={() => {
                                                    setModify(false)
                                                    setConserjeModificado({
                                                        nombre: "",
                                                        telefono: "",
                                                        turno: "",
                                                        avatar: ""
                                                    })
                                                }}>Cancelar Cambios</button></div>
                                                    <div>
                                                        <button className="btn btn-success" onClick={() => {
                                                            changeConserje(conserje.id, conserjeModificado)
                                                            setConserjeModificado({
                                                                nombre: "",
                                                                telefono: "",
                                                                turno: "",
                                                                avatar: ""
                                                            })
                                                            setModify(false)
                                                        }}>Guardar Cambios</button></div></div>)}

                                            </div>


                                        </div>

                                    )

                            })


                        }


                    </div>

                </div>
            </div>
            <BorrarConserje borrar={borrar} setBorrar={setBorrar} id={idBorrar} />
            <ModalCrearConserje show={show} setShow={setShow} />
        </SidebarPage >
    )
};

export default Conserjes;