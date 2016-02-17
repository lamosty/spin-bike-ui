import * as actionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import merge from 'lodash.merge';
import Qty from 'js-quantities';

export function tripDashboard(state = {}, action) {
	switch(action.type) {
		case actionTypes.GET_TRIP_DATA:
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

		case actionTypes.TICK_TRIP_CLOCK:
			return merge({}, state, {
				totalTimeQty: calculate.totalTime(state.totalTimeQty)
			});

		case actionTypes.START_TRIP:
			return merge({}, state, {
				isMoving: false
			});

		case actionTypes.STOP_MOVING:
			return merge({}, state, {
				isMoving: false,
				speedQty: new Qty('0km/h')
			});
	}

	return state;
}
