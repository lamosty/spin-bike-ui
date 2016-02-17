import * as actionTypes from '../actions';
import * as calculate from '../utils/trip-calculators';
import { createTripId, getCurrentTrip } from '../utils/reducers-helpers';
import merge from 'lodash.merge';
import Qty from 'js-quantities';

export function tripDashboard(state = {}, action) {
	const { trips = [] } = state;

	switch(action.type) {
		case actionTypes.GET_TRIP_DATA: {
			let currentTrip = getCurrentTrip( trips );

			if ( ! state.isMoving ) {
				currentTrip.speedQty = new Qty( '0km/h' );

				return merge( {}, state, {
					trips: [ ...trips ],
					isMoving: true,
					movingThresholdTimeout: action.payload.movingThresholdTimeout
				} );
			}

			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			let { secondsBetweenPulses } = action.payload.pulseData;

			currentTrip = merge( currentTrip, {
				speedQty: calculate.speed( wheelDiameter, secondsBetweenPulses ),
				movingTimeQty: calculate.movingTime( secondsBetweenPulses, currentTrip.movingTimeQty ),
				distanceQty: calculate.distance( wheelDiameter, currentTrip.distanceQty )
			} );

			currentTrip.avgSpeedQty = calculate.avgSpeed( currentTrip.distanceQty, currentTrip.movingTimeQty );

			return merge( {}, state, {
				trips: [ ...trips ],
				isMoving: true,
				movingThresholdTimeout: action.payload.movingThresholdTimeout
			} );
		}

		case actionTypes.TICK_TRIP_CLOCK: {
			let currentTrip = getCurrentTrip( trips );

			currentTrip.totalTimeQty = calculate.totalTime( currentTrip.totalTimeQty );

			return merge( {}, state, {
				trips: [ ...trips ]
			} );
		}

		case actionTypes.START_TRIP: {
			const { startTime } = action.payload;

			let newTrip = {
				startTime,
				id: createTripId( trips )
			};

			return merge( {}, state, {
				trips: [ ...trips, newTrip ],
				isMoving: false
			} );
		}

		case actionTypes.STOP_TRIP: {
			const { stopTime } = action.payload;

			let currentTrip = getCurrentTrip(trips);

			currentTrip.stopTime = stopTime;

			return merge( {}, state, {
				trips: [ ...trips ],
				isMoving: false
			} );
		}

		case actionTypes.STOP_MOVING: {
			let currentTrip = getCurrentTrip( trips );

			currentTrip.speedQty = new Qty( '0km/h' );

			return merge( {}, state, {
				trips: [ ...trips ],
				isMoving: false
			} );
		}
	}

	return state;
}
