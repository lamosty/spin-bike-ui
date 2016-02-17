import * as actionTypes from '../actions';
import merge from 'lodash.merge';
import { createResistanceRecordId, getLastResistanceRecord } from '../utils/reducers-helpers';
import * as calculate from '../utils/trip-calculators';

export function resistanceInput(state = {}, action) {
	const { resistanceRecords = [] } = state;

	switch(action.type) {
		case actionTypes.START_TRIP: {
			const { startTime } = action.payload;

			let newResistanceRecord = {
				startTime,
				levelId: 1, // TODO: set from user's default.
				id: createResistanceRecordId( resistanceRecords )
			};

			return merge( {}, state, {
				resistanceRecords: [ ...resistanceRecords, newResistanceRecord ]
			} );
		}

		case actionTypes.GET_TRIP_DATA: {
			let lastResistanceRecord = getLastResistanceRecord( resistanceRecords );

			// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
			const wheelDiameter = 6.6; //in meters

			let { secondsBetweenPulses } = action.payload.pulseData;

			lastResistanceRecord = merge( lastResistanceRecord, {
				movingTimeQty: calculate.movingTime( secondsBetweenPulses, lastResistanceRecord.movingTimeQty ),
				distanceQty: calculate.distance( wheelDiameter, lastResistanceRecord.distanceQty )
			} );

			lastResistanceRecord.avgSpeedQty = calculate.avgSpeed( lastResistanceRecord.distanceQty, lastResistanceRecord.movingTimeQty );

			return merge( {}, state, {
				resistanceRecords: [ ...resistanceRecords ]
			} );
		}

		case actionTypes.CHANGE_RESISTANCE_LEVEL: {
			const { levelId, time } = action.payload;

			let lastResistanceRecord = getLastResistanceRecord(resistanceRecords);

			lastResistanceRecord.stopTime = time;

			let newResistanceRecord = {
				levelId,
				startTime: time,
				id: createResistanceRecordId( resistanceRecords )
			};

			return merge( {}, state, {
				resistanceRecords: [ ...resistanceRecords, newResistanceRecord ]
			} );
		}

		case actionTypes.STOP_TRIP: {
			const { stopTime } = action.payload;

			let lastResistanceRecord = getLastResistanceRecord(resistanceRecords);

			lastResistanceRecord.stopTime = stopTime;

			return merge( {}, state, {
				resistanceRecords: [ ...resistanceRecords ]
			} );
		}
	}

	return state;
}