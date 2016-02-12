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

// TODO: refactor to separate file.
function trip(state = {}, action) {
	if (action.type != ActionTypes.GET_PULSE_DATA) {
		return state;
	}

	// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
	const wheelDiameter = 6.6; //in meters

	const { secondsBetweenPulses } = action.payload;

	// TODO: append previous state, don't discard it.
	let newState = {
		speedQty: calculate.speed(wheelDiameter, secondsBetweenPulses),
		totalTimeQty: calculate.totalTime(secondsBetweenPulses, state.totalTimeQty),
		totalDistanceQty: calculate.totalDistance(wheelDiameter, state.totalDistanceQty)
	};

	newState.avgSpeed = calculate.avgSpeed(newState.totalDistanceQty, newState.totalTimeQty);

	return newState;
}

const rootReducer = combineReducers({
	rpmMeter,
	trip,
	routing: routeReducer
});


export default rootReducer;