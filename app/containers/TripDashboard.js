import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripDashboard from '../components/trip-dashboard';
import { startTrip, stopTrip, changeResistanceLevel } from '../actions';
import { getCurrentTrip } from '../utils/reducers-helpers';

class TripDashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <TripDashboard {...this.props} />;
	}
}

function mapStateToProps(state) {
	return {
		isTripRunning: state.rpmMeter.isTripRunning,
		currentTrip: getCurrentTrip(state.tripDashboard.trips),
		user: state.user,
		resistanceInput: state.resistanceInput
	};
}

export default connect(
	mapStateToProps,
	{
		startTrip,
		stopTrip,
		changeResistanceLevel
	}
)(TripDashboardContainer);