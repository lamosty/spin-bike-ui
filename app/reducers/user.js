import * as actionTypes from '../actions';

export function user(state = {}, action) {

	// TODO: add a real user auth
	switch(action.type) {
		case actionTypes.START_TRIP:
			return {
				id: 1,
				dashboardFormat: {
					speed: 'km/h',
					avgSpeed: 'km/h',
					distance: 'km',
					time: '00:00:00'
				},
				resistanceLevels: [
					{id: 1, title: '1'},
					{id: 2, title: '2'},
					{id: 3, title: '3'}
				]
			}
	}

	return state;
}