import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripDashboard from '../components/trip-dashboard';
import { startTrip, stopTrip } from '../actions';

class TripDashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { startTrip, stopTrip, isTripRunning, tripInfo, user } = this.props;

		// TODO: use object spread operator for this.props.
		return (
			<TripDashboard startTrip={startTrip} stopTrip={stopTrip} isTripRunning={isTripRunning}
			           tripInfo={tripInfo} user={user}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		isTripRunning: state.rpmMeter.isTripRunning,
		tripInfo: state.trip,
		user: state.user
	};
}

export default connect(
	mapStateToProps,
	{
		startTrip,
		stopTrip
	}
)(TripDashboardContainer);