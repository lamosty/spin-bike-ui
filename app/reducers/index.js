import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { tripDashboard } from './tripDashboard';
import { rpmMeter } from './rpmMeter';
import { user } from './user';

const rootReducer = combineReducers({
	rpmMeter,
	tripDashboard,
	user,
	routing: routeReducer
});

export default rootReducer;