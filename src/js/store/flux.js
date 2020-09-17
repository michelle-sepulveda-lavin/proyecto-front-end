const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiURL: "http://localhost:5000",
			username: '',
            password: '',
            currentUser: null,
            error: null,
            success: null,
            profile: null,
			edificios: [],
			msgEmail: null
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
                        error: msg
                    })
				}else{
					setStore({
                        username: '',
                        password: '',
                        currentUser: data,
                        error: null
                    })
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    sessionStorage.setItem('currentUser', JSON.stringify(data));
                    /* history.push("/") */
                }

                console.log(data);
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
				if(resp.ok){
					alert(data.msg)

				}
				else if (msg !== undefined) {
					setStore({
                        error: msg
                    })
				}
			},
			buscarEmail: async (e, email) =>{
				e.preventDefault();
				const { apiURL } = getStore();
				const resp = await fetch(`${apiURL}/recuperar-password`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({email})	
				});
				const data = await resp.json();
				const { msg } = data;
				if (msg !== undefined) {
					setStore({
                        msgEmail: msg
                    })
				}
			},
			resetMsg:() =>{
				setStore({
					msgEmail : null
				})
			}
			
/* 			logout: () => {
                localStorage.removeItem("currentUser");
                sessionStorage.removeItem("currentUser");
                setStore({
                    currentUser: null
                })
            },
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