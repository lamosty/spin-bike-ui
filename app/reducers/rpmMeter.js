import * as actionTypes from '../actions';

export function rpmMeter(state = {}, action) {
	switch(action.type) {
		case actionTypes.START_TRIP:
			const { payload } = action;

			return {
				stopFunction: payload.stopFunction,
				tripClock: payload.tripClock,
				isTripRunning: true
			};

		case actionTypes.STOP_TRIP:
			return {
				isTripRunning: false
			}
	}

	return state;
}
