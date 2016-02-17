import * as actionTypes from '../actions';
import merge from 'lodash.merge';
import { createResistanceRecordId, getLastResistanceRecord } from '../utils/reducers-helpers';

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