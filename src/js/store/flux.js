const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token : null
		},
		actions: {
			setToken:() => {
				localStorage.setItem("token", JSON.stringify(getStore().token));
			},
			loginAction: async (aux) => {
				const resp = await fetch("http://localhost:5000/login", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(aux)
				});
				const data = await resp.json();
				if (!resp.ok) {
					alert(data.msg);
				}else{
					setStore({token : data.access_token})
					getActions().setToken(getStore().token)
				}
			},
		}
	};
};

export default getState;