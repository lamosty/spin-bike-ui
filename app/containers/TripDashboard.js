import React, { Component } from 'react';
import { connect } from 'react-redux';
import TripDashboard from '../components/trip-dashboard';
import { startRpmMeter, stopRpmMeter } from '../actions';

class TripDashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { startRpmMeter, stopRpmMeter, isTripRunning, tripInfo, user } = this.props;

		// TODO: use object spread operator for this.props.
		return (
			<TripDashboard startRpmMeter={startRpmMeter} stopRpmMeter={stopRpmMeter} isTripRunning={isTripRunning}
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
		startRpmMeter,
		stopRpmMeter
	}
)(TripDashboardContainer);