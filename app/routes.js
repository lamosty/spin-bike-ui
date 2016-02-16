import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import TripDashboard from './containers/TripDashboard';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={TripDashboard} />
	</Route>
);
