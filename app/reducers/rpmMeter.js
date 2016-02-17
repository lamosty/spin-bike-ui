import * as actionTypes from '../actions';

export function rpmMeter(state = {}, action) {
	switch(action.type) {
		case actionTypes.START_LISTENING_TO_PULSES:
			const { payload } = action;

			return {
				stopFunction: payload.stopFunction,
				tripClock: payload.tripClock,
				isTripRunning: true
			};

		case actionTypes.STOP_LISTENING_TO_PULSES:
			return {
				isTripRunning: false
			}
	}

	return state;
}
