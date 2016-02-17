import * as actionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import merge from 'lodash.merge';
import Qty from 'js-quantities';

export function trip(state = {}, action) {
	switch(action.type) {
		case actionTypes.GET_PULSE_DATA:
			if (!state.isMoving) {
				return merge({}, state, {
					speedQty: new Qty('0km/h'),
					isMoving: true,
					movingThresholdTimeout: action.payload.movingThresholdTimeout
				});
			}

			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			let { secondsBetweenPulses } = action.payload.pulseData;

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

		case actionTypes.ON_TRIP_CLOCK_TICK:
			return merge({}, state, {
				totalTimeQty: calculate.totalTime(state.totalTimeQty)
			});

		case actionTypes.START_LISTENING_TO_PULSES:
			return merge({}, state, {
				isMoving: false
			});

		case actionTypes.STOPPED_MOVING:
			return merge({}, state, {
				isMoving: false,
				speedQty: new Qty('0km/h')
			});
	}

	return state;
}
