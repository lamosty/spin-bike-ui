import * as ActionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import merge from 'lodash.merge';
import Qty from 'js-quantities';

export function trip(state = {}, action) {
	switch(action.type) {
		case ActionTypes.GET_PULSE_DATA:
			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			let { secondsBetweenPulses } = action.payload.pulseData;

			if (!state.isMoving) {
				return merge({}, state, {
					speedQty: new Qty('0km/h'),
					isMoving: true,
					movingThresholdTimeout: action.payload.movingThresholdTimeout
				});
			}

			let tripNumbers = {
				speedQty: calculate.speed(wheelDiameter, secondsBetweenPulses),
				movingTimeQty: calculate.movingTime(secondsBetweenPulses, state.movingTimeQty),
				distanceQty: calculate.distance(wheelDiameter, state.distanceQty)
			};

			tripNumbers.avgSpeedQty = calculate.avgSpeed(tripNumbers.distanceQty, tripNumbers.movingTimeQty);

			return merge({}, state, tripNumbers, {
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
				isMoving: false,
				speedQty: new Qty('0km/h')
			});
	}

	return state;
}
