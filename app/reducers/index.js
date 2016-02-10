import * as ActionTypes from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as calculate from '../utils/trip-calculators';


function rpmMeter(state = {}, action) {
	switch(action.type) {
		// TODO: append previous state, don't discard it.
		case ActionTypes.START_LISTENING_TO_PULSES:
			const { payload } = action;

			return {
				stopFunction: payload.stopFunction,
				isTripRunning: true
			};

		case ActionTypes.STOP_LISTENING_TO_PULSES:
			return {
				isTripRunning: false
			}
	}

	return state;
}

function trip(state = {}, action) {
	if (action.type != ActionTypes.GET_PULSE_DATA) {
		return state;
	}

	const pulseData = action.payload;

	// TODO: append previous state, don't discard it.
	const newState = {
		speed: calculate.speed(pulseData)
	};

	return newState;
}

const rootReducer = combineReducers({
	rpmMeter,
	trip,
	routing: routeReducer
});


export default rootReducer;