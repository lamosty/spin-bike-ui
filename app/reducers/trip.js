import * as ActionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import merge from 'lodash.merge';

export function trip(state = {}, action) {
	switch(action.type) {
		case ActionTypes.GET_PULSE_DATA:
			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			let { secondsBetweenPulses } = action.payload.pulseData;
			const { isMoving } = state;

			if (!isMoving) {
				return merge({}, {
					isMoving: true,
					movingThresholdTimeout: action.payload.movingThresholdTimeout
				});
			}

			let newState = {
				speedQty: calculate.speed(wheelDiameter, secondsBetweenPulses),
				movingTimeQty: calculate.movingTime(secondsBetweenPulses, state.movingTimeQty),
				distanceQty: calculate.distance(wheelDiameter, state.distanceQty)
			};

			newState.avgSpeedQty = calculate.avgSpeed(newState.distanceQty, newState.movingTimeQty);

			return merge({}, state, newState, {
				isMoving: true,
				movingThresholdTimeout: action.payload.movingThresholdTimeout
			});

		case ActionTypes.ON_TRIP_CLOCK_TICK:
			return merge({}, state, {
				totalTimeQty: calculate.totalTime(state.totalTimeQty)
			});

		case ActionTypes.START_LISTENING_TO_PULSES:
			return merge({}, state, {
				isMoving: false
			});

		case ActionTypes.STOPPED_MOVING:
			return merge({}, state, {
				isMoving: false
			});
	}

	return state;
}
