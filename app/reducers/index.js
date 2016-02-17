import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { tripDashboard } from './tripDashboard';
import { rpmMeter } from './rpmMeter';
import { user } from './user';
import { resistanceInput } from './resistanceInput';

const rootReducer = combineReducers({
	rpmMeter,
	tripDashboard,
	user,
	resistanceInput,
	routing: routeReducer
});

export default rootReducer;