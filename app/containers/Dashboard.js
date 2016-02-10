import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { startRpmMeter, stopRpmMeter } from '../actions';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { startRpmMeter, stopRpmMeter, isTripRunning, tripInfo } = this.props;

		// TODO: use object spread operator for this.props.
		return (
			<Dashboard startRpmMeter={startRpmMeter} stopRpmMeter={stopRpmMeter} isTripRunning={isTripRunning}
			           tripInfo={tripInfo}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		isTripRunning: state.rpmMeter.isTripRunning,
		tripInfo: state.trip
	};
}

export default connect(
	mapStateToProps,
	{
		startRpmMeter,
		stopRpmMeter
	}
)(DashboardContainer);