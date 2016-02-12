import * as actionTypes from '../actions';

export function user(state = {}, action) {

	// TODO: add a real user auth
	switch(action.type) {
		case actionTypes.START_LISTENING_TO_PULSES:
			return {
				id: 1,
				dashboardFormat: {
					speed: 'km/h',
					avgSpeed: 'km/h',
					distance: 'km',
					time: 'h:min:s'
				}
			}
	}

	return state;
}