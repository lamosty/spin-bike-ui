import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';

export default class Dashboard extends Component {
	renderMeters() {
		const { tripInfo } = this.props;

		// TODO: add total time, cycling (moving) time
		return (
			<div>
				<NumberUnit title="" numberQty={tripInfo.speed} />
				<NumberUnit title="average speed" numberQty={tripInfo.avgSpeed} />
				<NumberUnit title="total distance" numberQty={tripInfo.totalDistance} />
			</div>
		);
	}

	render() {

		const { startRpmMeter, stopRpmMeter, isTripRunning } = this.props;

		return (
			<div className={styles.dashboard}>
				Dashboard
				<button onClick={startRpmMeter}>start rpm meter</button>
				<button onClick={stopRpmMeter}>stop rpm meter</button>
				{isTripRunning ? this.renderMeters() : null}
			</div>
		)
	}
}