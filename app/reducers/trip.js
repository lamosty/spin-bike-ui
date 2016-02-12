import * as ActionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';

export function trip(state = {}, action) {
	if (action.type != ActionTypes.GET_PULSE_DATA) {
		return state;
	}

	// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
	const wheelDiameter = 6.6; //in meters

	const { secondsBetweenPulses } = action.payload;

	let newState = {
		speedQty: calculate.speed(wheelDiameter, secondsBetweenPulses),
		totalTimeQty: calculate.totalTime(secondsBetweenPulses, state.totalTimeQty),
		totalDistanceQty: calculate.totalDistance(wheelDiameter, state.totalDistanceQty)
	};

	newState.avgSpeedQty = calculate.avgSpeed(newState.totalDistanceQty, newState.totalTimeQty);

	return newState;
}
