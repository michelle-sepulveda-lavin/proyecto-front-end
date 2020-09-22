
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: "http://localhost:5000",
            username: "",
            password: '',
            email: " ",
            rol_id: "",
            edificio_id: "",
            passwordConfirmacion: '',
            currentToken: "",
            currentUser: null,
            currentRol: null,
            currentEdificio: null,
            currentEdificioID: null,
            error: null,
            success: null,
            profile: null,
            edificios: [],
            msgEmail: null,
            flagRecordar: false,
            contactos: [],
            currentDate: null,
            contratos: {
                vigentes: [],
                porVencer: [],
                vencidos: []
            },
            flagModal: false,
            contactos: [],
            allUsuarios: [],
            archivoCSV: null,
            planes: [],
            departamentos: [],
            departamentoUsuarios: [],
            departamentosPorPiso: [],
            departamentoEstado: [],
            usuariosEdificio: []
        },
        actions: {
            handleChangeLogin: e => {
                setStore({
                    [e.target.name]: e.target.value
                })
            },
            loginAction: async (e) => {
                e.preventDefault();
                const { username, password, apiURL } = getStore();
                const resp = await fetch(`${apiURL}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                const data = await resp.json();

                const { msg } = data;

                if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                } else {
                    setStore({
                        username: '',
                        password: '',
                        currentUser: data,
                        error: null
                    })
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    /* sessionStorage.setItem('currentUser', JSON.stringify(data)); */
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    setStore({
                        currentRol: user.user.rol.name,
                        currentEdificio: user.user.edificio
                    })
                }
            },
            crearEdificio: async (e, aux) => {
                e.preventDefault()
                const { archivoCSV } = getStore();
                const dataEdificio = Object.entries(aux);
                const formData = new FormData();
                dataEdificio.map((dato) => {
                    formData.append(dato[0], dato[1])

                })
                formData.append("archivoCSV", archivoCSV)

                const resp = await fetch("http://localhost:5000/crearedificio", {
                    method: "POST",
                    headers: {},
                    body: formData
                });
                const data = await resp.json();
                const { msg } = data;
                if (resp.ok) {
                    alert(data.msg)

                }
                else if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                }
            },
            buscarEmail: async (e, email) => {
                e.preventDefault();
                const { apiURL } = getStore();
                const resp = await fetch(`${apiURL}/recuperar-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });
                const data = await resp.json();
                const { msg } = data;
                if (msg !== undefined) {
                    setStore({
                        msgEmail: msg
                    })
                }
            },
            resetMsg: () => {
                setStore({
                    msgEmail: null,
                    success: null
                })
            },
            handleSubmitContraseña: async (e, parametros, history) => {
                e.preventDefault()
                const { passwordConfirmacion, password, apiURL } = getStore();
                if (password === passwordConfirmacion && password !== "") {
                    const resp = await fetch(`${apiURL}/reset-password`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': `Bearer ${parametros.token}`
                        },
                        body: JSON.stringify({ "password": passwordConfirmacion })
                    });
                    const data = await resp.json();
                    history.push("/login")
                }

            },
            handleRecordar: (e) => {
                const { flagRecordar, username } = getStore();
                if (username !== "") {
                    if (!flagRecordar) {
                        localStorage.setItem("usuario", JSON.stringify(username))
                        localStorage.setItem("recordando", JSON.stringify("true"))
                        setStore({
                            flagRecordar: true
                        })
                    } else {
                        localStorage.removeItem("usuario")
                        localStorage.removeItem("recordando")
                        setStore({
                            flagRecordar: false
                        })
                    }
                }
            },
            mostrarUsuario: () => {
                const bandera = localStorage.getItem("recordando")
                const usuario = localStorage.getItem("usuario")
                if (bandera) {
                    setStore({
                        username: usuario.replace(/['"]+/g, ''),
                        flagRecordar: true
                    })
                }
            },
            getCurrentRol: () => {
                const store = getStore();
                if (localStorage.getItem("currentUser")) {
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    setStore({
                        ...store,
                        currentRol: user.user.rol.name
                    })
                }
            },
            getCurrentEdificio: async () => {
                const { apiURL } = getStore();
                if (localStorage.getItem("currentUser")) {
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    const idEdificio = user.user.edificio
                    setStore({
                        currentEdificioID: idEdificio
                    })
                    const response = await fetch(`${apiURL}/crearedificio/${idEdificio}`);
                    const data = await response.json()
                    if (!data.msg) {
                        setStore({
                            currentEdificio: data
                        })

                    }
                }
            },
            getEdificiosData: async () => {
                const store = getStore()
                const { getContratos } = getActions()
                const response = await fetch('http://127.0.0.1:5000/crearedificio');
                const data = await response.json()
                if (!data.msg) {
                    setStore({
                        ...store,
                        edificios: data
                    })
                    getContratos()
                }
            },
            getContactData: async () => {
                const store = getStore()
                const response = await fetch('http://127.0.0.1:5000/api/info-contacto');
                const data = await response.json()
                if (data.msg !== "empty list") {
                    setStore({
                        ...store,
                        contactos: data
                    })
                } else {
                    setStore({
                        ...store,
                        contactos: []
                    })
                }
            },
            handleClose: (history) => {
                localStorage.removeItem("currentUser")
                setStore({
                    currentRol: null,
                    currentUser: null
                })
                history.push("/")
            },
            getCurrentDate: () => {
                const { currentDate } = getStore();
                var q = new Date();
                var m = q.getMonth();
                var d = q.getDate();
                var y = q.getFullYear();
                var date = new Date(y, m, d);
                setStore({
                    currentDate: date
                })
            },
            getContratos: () => {
                const { edificios, currentDate, contratos } = getStore();
                edificios.length > 0 &&
                    edificios.map((edificio) => {
                        const fechaContrato = new Date(edificio.termino_contrato)
                        const mesContrato = fechaContrato.getMonth()
                        const mesActual = currentDate.getMonth();
                        const proximoVencer = (mesContrato - mesActual) <= 1 ? true : false;

                        if (currentDate > fechaContrato) {
                            contratos.vencidos.push(edificio)
                        } else if (currentDate < fechaContrato && proximoVencer) {
                            contratos.porVencer.push(edificio)
                        } else {
                            contratos.vigentes.push(edificio)
                        }
                    })

            },
            sesionIniciada: () => {
                if (localStorage.getItem("currentUser") !== null) {
                    const usuario = JSON.parse(localStorage.getItem("currentUser"))
                    setStore({
                        currentUser: usuario.user.email,
                        currentRol: usuario.user.rol.name
                    })
                }
            },
            activarModal: () => {
                setStore({
                    flagModal: true
                })
            },
            crearUsuario: async (e) => {
                e.preventDefault()
                const { apiURL, username, password, email, rol_id, edificio_id } = getStore();
                const resp = await fetch(`${apiURL}/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        rol_id: rol_id,
                        edificio_id: edificio_id
                    })
                });
                const data = await resp.json();
                if (data.msg) {
                    setStore({
                        error: data.msg
                    })
                } else {
                    alert("usuario creado")
                    setStore({
                        flagModal: false,
                        username: "",
                        password: "",
                        email: "",
                        rol_id: ""
                    });
                }
            },
            cerrarModal: () => {
                setStore({ flagModal: false })
            },
            getUsuarios: async (e) => {
                e.preventDefault()
                setStore({
                    allUsuarios: []
                })
                const { apiURL, rol_id } = getStore();
                const resp = await fetch(`${apiURL}/register/${rol_id}`)
                const data = await resp.json();
                const { msg } = data

                if (msg !== undefined) {
                    setStore({ error: msg })
                } else {
                    setStore({
                        allUsuarios: data
                    })
                }
            },
            guardarIndex: (i) => {
                const { allUsuarios } = getStore();
                setStore({
                    edificio_id: allUsuarios[i].edificio_id,
                    username: allUsuarios[i].username,
                    email: allUsuarios[i].email
                })
            },
            postUsuarios: async (e, i) => {
                e.preventDefault()
                const { email, edificio_id, apiURL } = getStore();
                const resp = await fetch(`${apiURL}/register`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        edificio_id: edificio_id
                    })
                })
                const data = await resp.json();
                const { msg } = data

                if (msg !== undefined) {
                    if (msg === "usuario actualizado correctamente") {
                        setStore({
                            success: msg,
                            email: "",
                            edificio_id: "",
                            username: "",
                            edificio_id: ""
                        })
                        getActions().getUsuarios(e)

                    } else {
                        setStore({ error: msg })
                    }
                }
            },
            deleteUsuarios: async (e, i) => {
                e.preventDefault()
                const { allUsuarios, apiURL } = getStore();
                const eliminado = allUsuarios[i].id

                const resp = await fetch(`${apiURL}/register/${eliminado}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await resp.json();
                const { msg } = data

                if (msg !== undefined) {
                    if (msg === "usuario eliminado correctamente") {
                        setStore({ success: msg })
                        alert("Usuario eliminado correctamente")
                        getActions().getUsuarios(e)
                    }
                    else {
                        setStore({ error: msg })
                    }
                } else {
                    console.log("ok")
                }
            },
            cargarCsv: e => {
                setStore({
                    [e.target.name]: e.target.files[0]
                })
            },
            getPlanes: async () => {
                const { planes } = getStore()
                const response = await fetch('http://127.0.0.1:5000/api/planes');
                const data = await response.json()
                if (!data.msg) {
                    setStore({
                        planes: data
                    })
                }
            },
            handleDepartamentos: async (e, modelInfo) => {
                e.preventDefault()
                const { apiURL, currentEdificio } = getStore();
                const resp = await fetch(`${apiURL}/info-departamento/${currentEdificio.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(modelInfo)
                });
                const data = await resp.json();
                const { msg } = data

                if (!resp.ok) {
                    alert(resp.ok)
                } else {
                    alert("ok")
                    getActions().getDepartamentos()
                }
            },
            getDepartamentos: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const response = await fetch(`${apiURL}/info-departamento/${currentEdificioID}`)
                const data = await response.json()
                if (!data) {
                    alert(data)
                } else {
                    setStore({
                        departamentos: data
                    })
                }
            },
            deleteModeloDpto: async (i) => {
                const { apiURL, departamentos } = getStore();
                const eliminado = departamentos[i].id
                const resp = await fetch(`${apiURL}/info-departamento/${eliminado}}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await resp.json();
                if (!resp.ok) {
                    alert(resp.ok)
                } else {
                    alert("ok")
                    getActions().getDepartamentos()
                }
            },
            postDptoUsuario: async (e, info) => {
                e.preventDefault()
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/departamentoUsuarioEdificio/${currentEdificioID}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(info)
                });
                const data = await resp.json();
                const { msg } = data;

                if (msg !== undefined) {
                    if (msg == "departamento de usuario creado exitosamente") {
                        setStore({
                            success: msg
                        })
                        alert(msg)
                        getActions().getDptosUsuarios()
                    } else {
                        setStore({
                            error: msg
                        })
                    }
                }
            },
            getDptosUsuarios: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const response = await fetch(`${apiURL}/departamentoUsuarioEdificio/${currentEdificioID}`)
                const data = await response.json()
                const { msg } = data;
                if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                } else {
                    setStore({
                        departamentoUsuarios: data
                    })
                }
            },
            deleteUsuarioDpto: async (i) => {
                const { apiURL, departamentoUsuarios } = getStore();
                const eliminado = departamentoUsuarios[i].id
                const resp = await fetch(`${apiURL}/departamentoUsuarioEdificio/${eliminado}}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await resp.json();
                if (data.msg !== "El departamento ha sido eliminado exitosamente") {
                    alert(data.msg)
                } else {
                    alert("Eliminado")
                    getActions().getDptosUsuarios()
                }
            },
            filtradoPiso: (piso) => {
                const { departamentoUsuarios } = getStore();
                setStore({
                    departamentoEstado: []
                })
                if (piso !== "todos") {
                    const auxiliar = departamentoUsuarios.filter((dpto, index) => {
                        return (dpto.piso == piso)
                    })
                    setStore({
                        departamentosPorPiso: auxiliar
                    })
                } else if (piso === "todos") {
                    setStore({
                        departamentosPorPiso: departamentoUsuarios
                    })
                }

            },
            getUsuariosDelEdificio: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/usuarios-edificio/${currentEdificioID}`)
                const data = await resp.json()
                const { msg } = data;
                if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                } else {
                    setStore({
                        usuariosEdificio: data
                    })
                }
            },
            filtradoEstado: (estado) => {
                const { departamentoUsuarios } = getStore();
                setStore({
                    departamentosPorPiso: []
                })
                if (estado !== "todos") {
                    const auxiliar = departamentoUsuarios.filter((dpto) => {
                        return (dpto.estado == estado)
                    })
                    setStore({
                        departamentoEstado: auxiliar
                    })
                } else if (estado === "todos") {
                    setStore({
                        departamentoEstado: departamentoUsuarios
                    })
                }

            },
            limpiarCamposFiltrado: () => {
                setStore({
                    departamentoEstado: [],
                    departamentosPorPiso: []
                })
            },
            addResidente: async (e,index, residente) => {
                e.preventDefault()
                setStore({ success : null})
                const { apiURL, departamentosPorPiso } = getStore();
                console.log(index)
                /* const dptoEditar = departamentosPorPiso[index].id
                const resp = await fetch(`${apiURL}/add-residente/${dptoEditar}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(residente)
                })
                const data = await resp.json()
                if(data.msg !== undefined)
                alert(data.msg)
                    if(data.msg === "Departamento actualizado exitosamente"){
                        setStore({
                            success: "Departamento actualizado exitosamente"
                        })
                    } */

            }
        }

    }
};

export default getState;