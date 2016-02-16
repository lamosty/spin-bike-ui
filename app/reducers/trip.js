import * as ActionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import merge from 'lodash.merge';

export function trip(state = {}, action) {
	switch(action.type) {
		case ActionTypes.GET_PULSE_DATA:
			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			const { secondsBetweenPulses } = action.payload;

			let newState = {
				speedQty: calculate.speed(wheelDiameter, secondsBetweenPulses),
				movingTimeQty: calculate.movingTime(secondsBetweenPulses, state.movingTimeQty),
				totalDistanceQty: calculate.totalDistance(wheelDiameter, state.totalDistanceQty)
			};

			newState.avgSpeedQty = calculate.avgSpeed(newState.totalDistanceQty, newState.movingTimeQty);

			return merge({}, state, newState);

		case ActionTypes.ON_TRIP_CLOCK_TICK:
			return merge({}, state, {
				totalTimeQty: calculate.totalTime(state.totalTimeQty)
			});
	}

	return state;
}
