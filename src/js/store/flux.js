
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
            allUsuarios: [],
            archivoCSV: null,
            planes: [],
            crearConserje: {
                error: null,
                avatar: null
            },
            currentEdificio: null,
            roles: [],
            conserjes: []
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
                        currentRol: user.user.rol.name
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
                    currentUser: null,
                    currentEdificio: null,
                    conserjes: []
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
                const { apiURL, username, password, email, rol_id, edificio_rol } = getStore();
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
                        edificio_id: edificio_rol
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
            crearConserje: async (e, aux) => {
                const actions = getActions()
                const store = getStore()
                const { crearConserje, currentEdificio, roles, apiURL } = getStore()
                e.preventDefault()
                const conserjeIndex = roles.length > 0 && (roles.map((rol) => rol.rol).indexOf('conserje'));

                const formData = new FormData();
                if (aux.email !== undefined && aux.email !== "") {
                    formData.append("email", aux.email);
                }
                if (aux.password !== undefined && aux.password !== "") {
                    formData.append("password", aux.password);
                }

                if (aux.avatar !== undefined && aux.avatar !== "") {
                    formData.append("avatar", aux.avatar)

                }

                formData.append("username", aux.username);

                formData.append("edificios_id", currentEdificio)
                formData.append("rol_id", roles[conserjeIndex].id)
                formData.append("nombre", aux.nombre);
                formData.append("telefono", aux.telefono);
                formData.append("turno", aux.turno);


                try {
                    const resp = await fetch("http://localhost:5000/conserjes", {
                        method: "POST",
                        headers: {},
                        body: formData
                    });
                    const data = await resp.json();
                    console.log(data)
                    const { msg } = data;
                    if (resp.ok) {
                        alert(data.msg)
                        setStore({
                            crearConserje: { ...crearConserje, error: null }
                        })
                    }
                    else if (msg !== undefined) {
                        setStore({
                            crearConserje: { ...crearConserje, error: msg }
                        })
                    }
                    actions.getConserjes(store.currentEdificio)

                }
                catch (error) {
                    console.log(error)
                }
                console.log(aux.email)
            },
            getCurrentEdificio: () => {
                const { currentEdificio } = getStore();
                if (localStorage.getItem("currentUser")) {
                    const user = JSON.parse(localStorage.getItem("currentUser"));
                    setStore({
                        currentEdificio: user.user.edificio
                    })
                }
            },
            getRoles: async () => {
                const { roles } = getStore()

                try {
                    const response = await fetch('http://127.0.0.1:5000/roles');
                    const data = await response.json()
                    console.log(data)
                    setStore({
                        roles: data
                    })

                }
                catch (error) {
                    console.log(error)
                }

            },
            getConserjes: async (id) => {
                const { conserjes, apiURL } = getStore()
                try {
                    if (id !== null && id !== undefined) {
                        const response = await fetch(`${apiURL}/conserjes/edificio/${id}`);
                        const data = await response.json()
                        console.log(data)
                        if (response.ok) {
                            setStore({
                                conserjes: data
                            })
                        }
                    }
                }
                catch (error) {
                    console.log(error)
                }
            },
            cambiarEstadoConserje: async (id, estado) => {
                const { apiURL, currentEdificio } = getStore()
                const actions = getActions()
                try {
                    const response = await fetch(`${apiURL}/conserjes/estado-conserje/${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ estado_conserje: estado }),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    })
                    const data = await response.json()
                    console.log(data)
                    actions.getConserjes(currentEdificio)
                }

                catch (error) {
                    console.log(error)
                }
            }
        }
    };
};

export default getState;