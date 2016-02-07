import * as ActionTypes from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';


function rpmMeter(state = {}, action) {
	switch(action.type) {
		case ActionTypes.START_LISTENING_TO_PULSES:
			const { payload } = action;

			return {
				rpmMeter: payload.rpmMeter,
				stopFunction: payload.stopFunction
			};
	}

	return state;
}

const rootReducer = combineReducers({
	rpmMeter,
	routing: routeReducer
});


export default rootReducer;