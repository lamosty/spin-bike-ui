import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import * as actionTypes from '../actions';

const reduxRouterMiddleware = syncHistory(browserHistory);

const reduxLoggerOptions = {
	predicate(getState, action) {
		// Exclude these actions from being logged.
		const actionBlacklist = [
			actionTypes.TICK_TRIP_CLOCK
		];

		for (let actionType of actionBlacklist) {
			if (action.type === actionType) {
				return false;
			}
		}

		return true;
	}
};

export default function configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, reduxRouterMiddleware, createLogger(reduxLoggerOptions)),
			DevTools.instrument()
		)
	);

	// Required for replaying actions from devtools to work.
	reduxRouterMiddleware.listenForReplays(store);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers.
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	return store;
}
