import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';
import { startRpmMeter, stopRpmMeter } from '../actions';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { startRpmMeter, stopRpmMeter } = this.props;

		return (
			<Dashboard startRpmMeter={startRpmMeter} stopRpmMeter={stopRpmMeter} />
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(
	mapStateToProps,
	{
		startRpmMeter,
		stopRpmMeter
	}
)(DashboardContainer);