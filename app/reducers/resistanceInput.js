import * as actionTypes from '../actions';
import merge from 'lodash.merge';

export function resistanceInput(state = {}, action) {
	switch(action.type) {
		case actionTypes.CHANGE_RESISTANCE_LEVEL:
			const newResistanceRecord = {
				levelId: action.payload.levelId
			};

			const { resistanceRecords = [] } = state;

			return merge({}, state, {
				resistanceRecords: [...resistanceRecords, newResistanceRecord]
			});
	}

	return state;
}