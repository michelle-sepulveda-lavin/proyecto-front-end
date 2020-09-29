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
<<<<<<< HEAD
/* 			state.actions.getRoles()
 */			state.actions.getCurrentRol();
=======
			/* state.actions.getRoles() */
			state.actions.getCurrentRol();
			state.actions.getEdificiosData()
>>>>>>> c0b1380c11a6901f0bc48415f2acaf78dfbefb90
			state.actions.getCurrentDate()
			state.actions.sesionIniciada()
		}, []);


		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;