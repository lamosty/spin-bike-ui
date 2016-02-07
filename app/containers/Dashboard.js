import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../components/dashboard';

class DashboardContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Dashboard />
		);
	}
}

function mapStateToProps(state) {
	return {};
}

export default connect(mapStateToProps, {})(DashboardContainer);