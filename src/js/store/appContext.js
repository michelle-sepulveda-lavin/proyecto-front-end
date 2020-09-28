import React, { useState, useEffect } from "react";
import getState from './flux';

export const Context = React.createContext(null);


const injectContext = PassedComponent => {

	const StoreWrapper = props => {
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			const user = JSON.parse(localStorage.getItem("currentUser"))
			const edificioID = user.user.edificio
			state.actions.getRoles()
			state.actions.getCurrentRol();
			state.actions.getEdificiosData()
			state.actions.getCurrentDate()
			state.actions.sesionIniciada()
			state.actions.getEdificioCompleto()
			state.actions.getBoletines(edificioID)
		}, []);

		useEffect(() => {
			state.actions.getCurrentEdificio()

		}, [state.store.currentRol])

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;