import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { trip } from './trip';
import { rpmMeter } from './rpmMeter';

const rootReducer = combineReducers({
	rpmMeter,
	trip,
	routing: routeReducer
});

export default rootReducer;