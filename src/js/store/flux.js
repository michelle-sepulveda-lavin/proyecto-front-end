
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiURL: "http://localhost:5000",
            username: "",
            password: '',
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
            contactos: []
        },
        actions: {
            handleChangeLogin: e => {
                setStore({
                    [e.target.name]: e.target.value
                })
            },
            loginAction: async (e) => {
                e.preventDefault();
                const { username, password, apiURL, currentRol } = getStore();
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
                const resp = await fetch("http://localhost:5000/crearedificio", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(aux)
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
                    msgEmail: null
                })
            },
            handleSubmitContraseña: async (e, parametros, history) => {
                e.preventDefault()
                const { passwordConfirmacion, password, apiURL } = getStore();
                if (password === passwordConfirmacion && password != "") {
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
                const response = await fetch('http://127.0.0.1:5000/crearedificio');
                const data = await response.json()
                setStore({
                    ...store,
                    edificios: data
                })
            },
            getContactData: async () => {
                const store = getStore()
                const response = await fetch('http://127.0.0.1:5000/api/info-contacto');
                const data = await response.json()
                setStore({
                    ...store,
                    contactos: data
                })
                console.log(data)
            },
            handleClose: (history) => {
                localStorage.removeItem("currentUser")
                setStore({
                    currentRol: null,
                    currentUser: null
                })
                history.push("/")
            }

            /* 			
                        profile: () => {
                            const { apiURL, currentUser: { access_token } } = getStore();
            
                            fetch(`${apiURL}/api/profile`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${access_token}` 
                                }
                            })
                                .then(resp => resp.json())
                                .then(data => console.log(data));
                        },
                        tieneSession: () => {
                            if (sessionStorage.getItem("currentUser")) {
                                setStore({
                                    currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
                                })
                            }
                        }, */
        }
    };
};

export default getState;