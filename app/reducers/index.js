import * as ActionTypes from '../actions';
import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

function dummy(state = {}, action) {
	return state;
}

const rootReducer = combineReducers({
	dummy,
	routing: routeReducer
});


export default rootReducer;