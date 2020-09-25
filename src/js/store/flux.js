
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
            edificioCompleto: null,
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
            departamentos: [],
            departamentoUsuarios: [],
            departamentosPorPiso: [],
            departamentoEstado: [],
            usuariosEdificio: [],
            crearConserje: {
                error: null,
                avatar: null
            },
            roles: [],
            conserjes: [],
            finalUserBuilding: [],
            departamentoModificar: null,
            bodegaM2: 10,
            estacionamientoM2: 15,
            usuariosEdificioNoAsignados: null,
            contadorUsuarios: null,
            bodegasEdificio: null,
            estacionamientoEdificios: null,
            paqueteriaEdificio: [],
            gastosComunes: [],
            crearGastoComun: { error: null },
            montosTotalesMes: [],
            gastosComunesMesActual: [],
            errorLogin: null,
            errorPaqueteria: null,
            gastosMes: [],
            gastosDepto: [],
            departamentoActualUsuario: []
        },
        actions: {
            handleChangeLogin: e => {
                setStore({
                    [e.target.name]: e.target.value
                })
            },
            loginAction: async (e, history) => {
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
                        errorLogin: msg
                    })
                } else {
                    setStore({
                        username: '',
                        password: '',
                        currentUser: data,
                        errorLogin: null,
                        currentRol: data.user.rol.name,
                        currentEdificio: data.user.edificio
                    })
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    history.push("/dashboard")
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
                    success: null,
                    error: null
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
            getEdificioCompleto: async () => {
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
                            edificioCompleto: data
                        })

                    }
                }
            },
            getEdificiosData: async () => {
                const store = getStore()
                const { getContratos } = getActions()
                const response = await fetch('http://127.0.0.1:5000/crearedificio');
                const data = await response.json()
                if (response.ok) {
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
                    edificioCompleto: null,
                    error: null,
                    success: null,
                    profile: null,
                    edificios: [],
                    msgEmail: null,
                    contactos: [],
                    contratos: {
                        vigentes: [],
                        porVencer: [],
                        vencidos: []
                    },
                    allUsuarios: [],
                    archivoCSV: null,
                    departamentos: [],
                    departamentoUsuarios: [],
                    departamentosPorPiso: [],
                    departamentoEstado: [],
                    usuariosEdificio: [],
                    crearConserje: {
                        error: null,
                        avatar: null
                    },
                    roles: [],
                    conserjes: [],
                    finalUserBuilding: [],
                    departamentoModificar: null,
                    usuariosEdificioNoAsignados: null,
                    contadorUsuarios: null,
                    bodegasEdificio: null,
                    estacionamientoEdificios: null,
                    errorLogin: null
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
                    getActions().getUsuariosDelEdificio()
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
                const { apiURL, edificioCompleto } = getStore();
                const resp = await fetch(`${apiURL}/info-departamento/${edificioCompleto.id}`, {
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
                const { msg } = data
                if (msg == undefined) {
                    setStore({
                        departamentos: data
                    })
                } else {
                    setStore({
                        error: msg
                    })
                }
            },
            deleteModeloDpto: async (i) => {
                const { apiURL, departamentos } = getStore();
                const eliminado = departamentos[i].id
                console.log(eliminado)
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
                console.log(data)
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
                        departamentoUsuarios: data,
                    })
                    getActions().usuariosNoAsignados()
                    await setStore({
                        contadorUsuarios: getStore().departamentoUsuarios.length
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
                    getActions().usuariosparaAsignar()
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
            addResidente: async (e, residente) => {
                e.preventDefault()
                setStore({ success: null })
                const { apiURL, departamentoModificar } = getStore();
                const resp = await fetch(`${apiURL}/add-residente/${departamentoModificar}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(residente)
                })
                const data = await resp.json()
                if (data.msg !== undefined) {
                    alert(data.msg)
                    if (data.msg === "Departamento actualizado exitosamente") {
                        setStore({
                            success: "Departamento actualizado exitosamente"
                        })

                    }
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
            },
            usuariosparaAsignar: () => {
                const { usuariosEdificio } = getStore();
                if (!!usuariosEdificio) {
                    const aux = usuariosEdificio.filter((user) => {
                        return (
                            user.rol.name === "usuario"
                        )
                    })
                    setStore({
                        finalUserBuilding: aux
                    })
                    getActions().usuariosNoAsignados()
                }
            },
            dptoModificar: (numero) => {
                setStore({
                    departamentoModificar: numero
                })
            },
            getTotalM2: (modelos) => {
                const { departamentos, edificioCompleto, bodegasEdificio, estacionamientoEdificios } = getStore()
                const totalModelos = []
                const totalBodega = edificioCompleto.total_bodegas * bodegasEdificio.total_superficie;
                const totalEstacionamiento = edificioCompleto.total_estacionamientos * estacionamientoEdificios.total_superficie;

                if (departamentos.length > 0) {
                    modelos.map((modelo) => {
                        totalModelos.push(modelo.cantidad_total * modelo.total)
                    })
                    const totalEdificio = totalModelos.reduce((a, b) => a + b) + totalBodega + totalEstacionamiento;
                    return totalEdificio
                } else {
                    return null
                }

            },
            calculoPorcentajeGastoComunDepto: (depto, montoGastos, depaID, comprobante, history) => {
                const { getTotalM2, postGastosComunes } = getActions()
                const { departamentos, bodegasEdificio, estacionamientoEdificios, gastosComunes, currentEdificio, currentDate } = getStore()
                const totalM2edificio = getTotalM2(departamentos)

                const mes = currentDate.getMonth()
                const year = currentDate.getFullYear()

                const formData = new FormData();
                formData.append("month", mes)
                formData.append("year", year)
                formData.append("edificio_id", currentEdificio)
                formData.append("montoTotal", montoGastos)
                formData.append("departamento_id", depaID)
                formData.append("comprobante", comprobante.comprobante)


                let tamañoDepto = departamentos.filter(depart => depart.id === depto.modelo.id)[0].total
                if (depto.bodega_id !== null && depto.estacionamiento_id !== null) {
                    tamañoDepto += (bodegasEdificio.total_superficie + estacionamientoEdificios.total_superficie)
                }
                else if (depto.estacionamiento_id !== null && depto.bodega_id === null) {
                    tamañoDepto += estacionamientoEdificios.total_superficie
                } else if (depto.estacionamiento_id === null && depto.bodega_id !== null) {
                    tamañoDepto += bodegasEdificio.total_superficie
                }
                if (!!totalM2edificio) {
                    const porcentaje = (tamañoDepto / totalM2edificio)
                    const montoGastoComun = (parseFloat(montoGastos) * porcentaje)
                    formData.append("monto", montoGastoComun)
                    gastosComunes.push(montoGastoComun)
                    postGastosComunes(formData, history)
                    return montoGastoComun
                }
                return ("problema con FETCH")

            },
            calculoGastoPromedio: (monto) => {
                const { edificioCompleto } = getStore()

                const promedio = monto / edificioCompleto.numero_departamentos

                return promedio
            },
            usuariosNoAsignados: () => {
                const { departamentoUsuarios, finalUserBuilding } = getStore();
                if (!!departamentoUsuarios) {
                    const aux = departamentoUsuarios.filter((dpto) => {
                        return dpto.residente.id != null
                    })
                    const aux2 = aux.map((dpto) => {
                        /* return {"id": dpto.residente.id, "name": dpto.residente.name, "email": dpto.residente.email} */
                        return dpto.residente.name
                    })

                    const aux3 = finalUserBuilding.filter((dpto) => {
                        return !aux2.includes(dpto.username)
                    })
                    setStore({
                        usuariosEdificioNoAsignados: aux3
                    })

                }
            },
            handleBodegas: async (e, modelInfo) => {
                e.preventDefault()
                const { apiURL, edificioCompleto } = getStore();
                modelInfo.cantidad_total = edificioCompleto.total_bodegas
                const resp = await fetch(`${apiURL}/add-bodega/${edificioCompleto.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(modelInfo)
                });
                const data = await resp.json();
                const { msg } = data

                if (!resp.ok) {
                    alert(msg)
                } else {
                    alert("ok")
                }
            },
            handleEstacionamiento: async (e, modelInfo) => {
                e.preventDefault()
                const { apiURL, edificioCompleto } = getStore();
                modelInfo.cantidad_total = edificioCompleto.total_estacionamientos
                const resp = await fetch(`${apiURL}/add-estacionamiento/${edificioCompleto.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(modelInfo)
                });
                const data = await resp.json();
                const { msg } = data

                if (!resp.ok) {
                    alert(msg)
                } else {
                    alert("ok")
                }
            },
            getBodegasDelEdificio: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/bodegas/${currentEdificioID}`)
                const data = await resp.json()
                const { msg } = data;
                if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                } else {
                    setStore({
                        bodegasEdificio: data
                    })
                }
            },
            getEstacionamientosDelEdificio: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/estacionamientos/${currentEdificioID}`)
                const data = await resp.json()
                const { msg } = data;
                if (msg !== undefined) {
                    setStore({
                        error: msg
                    })
                } else {
                    setStore({
                        estacionamientoEdificios: data
                    })
                }
            },
            postGastosComunes: async (datos, history) => {
                const { apiURL } = getStore();

                const resp = await fetch(`${apiURL}/gastoscomunes`, {
                    method: "POST",
                    headers: {},
                    body: datos
                })

                const data = await resp.json();

                const { msg } = data;
                if (!resp.ok) {
                    setStore({
                        crearGastoComun: { error: msg }
                    })
                } else {
                    setStore({
                        crearGastoComun: { error: msg }
                    })
                    setTimeout(() => {
                        history.push("/admin/gastos-comunes")
                    }, 2500);
                }
            },
            getMontosTotales: async () => {
                const { apiURL, currentEdificioID, montosTotalesMes } = getStore();
                try {
                    const resp = await fetch(`${apiURL}/montostotales/edificio/${currentEdificioID}`)
                    const data = await resp.json()
                    if (resp.ok) {
                        setStore({
                            montosTotalesMes: data
                        })
                    }
                    const { msg } = data;
                }
                catch (error) {
                    console.log(error)
                }


            },
            getGastosMonthYear: async (month, year) => {
                const { apiURL, currentEdificioID, gastosMes } = getStore();
                const resp = await fetch(`${apiURL}/gastoscomunes/edificio/${currentEdificioID}/${month}/${year}`)
                const data = await resp.json()
                const { msg } = data;
                setStore({
                    gastosMes: data
                })

            },
            getGastosMesActual: async () => {
                const { apiURL, currentEdificioID, currentDate, gastosComunesMesActual, montosTotalesMes } = getStore();

                const month = currentDate.getMonth()
                const year = currentDate.getFullYear()
                const resp = await fetch(`${apiURL}/gastoscomunes/edificio/${currentEdificioID}/${month}/${year}`)
                const data = await resp.json()
                const { msg } = data;
                setStore({
                    gastosComunesMesActual: data
                })

            },
            getGastosDeptoActual: async (id) => {
                const { apiURL, currentEdificioID, gastosDepto } = getStore();

                const resp = await fetch(`${apiURL}/gastoscomunes/depto/${currentEdificioID}/${id}`)
                const data = await resp.json()
                const { msg } = data;
                setStore({
                    gastosDepto: data
                })

            },
            deleteBodegaEdificio: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/delete-bodega-edificio/${currentEdificioID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await resp.json()
                if (resp.ok) {
                    getActions().getBodegasDelEdificio()
                    alert(data.msg)
                } else {
                    alert(data.msg)
                }
            },
            deleteEstacionamientoEdificio: async () => {
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/delete-estacionamiento-edificio/${currentEdificioID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await resp.json()
                if (resp.ok) {
                    getActions().getEstacionamientosDelEdificio()
                    alert(data.msg)
                } else {
                    alert(data.msg)
                }

            },
            cambiarEstadoGastoComun: async (depto, month, year, estado) => {
                const { apiURL, currentEdificio } = getStore()
                const actions = getActions()
                try {
                    const response = await fetch(`${apiURL}/gastoscomunes/depto/${currentEdificio}/${depto}/${month}/${year}`, {
                        method: "PATCH",
                        body: JSON.stringify({ estado: estado }),
                        headers: { 'Content-type': 'application/json; charset=UTF-8' }
                    })
                    const data = await response.json()
                    console.log(data)
                    actions.getGastosMonthYear(month, year)
                }
                catch (error) {
                    console.log(error)
                }

            },
            getPaqueteria: async () => {
                const { apiURL, currentEdificioID } = getStore();
                setStore({
                    errorPaqueteria: null
                })
                const resp = await fetch(`${apiURL}/paqueteria/${currentEdificioID}`)
                const data = await resp.json();
                if (resp.ok) {
                    setStore({
                        paqueteriaEdificio: data
                    })
                } else {
                    setStore({
                        errorPaqueteria: data.msg
                    })

                }
            },
            getDepartamentoActualUsuario: async (id) => {
                const { departamentoActualUsuario } = getStore()

                const response = await fetch(`http://127.0.0.1:5000/departamentoUsuario/${id}`);
                const data = await response.json()
                if (response.ok) {
                    setStore({
                        departamentoActualUsuario: data
                    })
                }
            },
            handlePaqueteria: async (e, numeroDpto) => {
                e.preventDefault();
                const { apiURL, currentEdificioID } = getStore();
                const resp = await fetch(`${apiURL}/paqueteria/${currentEdificioID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(numeroDpto)
                });
                const data = await resp.json();
                if (resp.ok) {
                    alert(data.msg)
                    getActions().getPaqueteria()
                } else {
                    alert(data.msg)
                }

            },
            estadoPaquete: async (index) => {
                const { apiURL, paqueteriaEdificio } = getStore();
                const modificado = paqueteriaEdificio[index].id
                const resp = await fetch(`${apiURL}/paqueteria/${modificado}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ estado: true })
                });
                const data = await resp.json()
                if (resp.ok) {
                    alert(data.msg)
                    getActions().getPaqueteria()
                } else {
                    alert(data.msg)
                }
            }
        }
    }
    };

    export default getState;