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
			state.actions.getRoles()
			state.actions.getPlanes()
			state.actions.getCurrentRol();
			state.actions.getEdificiosData()
			state.actions.getContactData()
			state.actions.getCurrentDate()
			state.actions.sesionIniciada()
			state.actions.getCurrentEdificio()
			state.actions.getConserjes()
			state.actions.getEdificioCompleto()
			state.actions.getDptosUsuarios()
			state.actions.getBodegasDelEdificio()
			state.actions.getEstacionamientosDelEdificio()
			state.actions.getDepartamentos()
			state.actions.getMontosTotales()
			state.actions.getGastosMesActual()
			state.actions.getBoletines()
		}, []);

		useEffect(() => {
			state.actions.getConserjes(state.store.currentEdificio)

		}, [state.store.currentEdificio])

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