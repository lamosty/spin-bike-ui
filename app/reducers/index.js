import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { trip } from './trip';
import { rpmMeter } from './rpmMeter';
import { user } from './user';

const rootReducer = combineReducers({
	rpmMeter,
	trip,
	user,
	routing: routeReducer
});

export default rootReducer;