import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';

export default class Dashboard extends Component {
	renderMeters() {
		const { tripInfo, user } = this.props;

		const userFormat = user.dashboardFormat;

		return (
			<div>
				<NumberUnit
					title="speed"
					quantity={tripInfo.speedQty}
					format={userFormat.speed}
				/>
				<NumberUnit
					title="average speed"
					quantity={tripInfo.avgSpeedQty}
					format={userFormat.avgSpeed}
				/>
				<NumberUnit
					title="total distance"
					quantity={tripInfo.totalDistanceQty}
				    format={userFormat.distance}
				/>
				<NumberUnit
					title="total time"
					quantity={tripInfo.totalTimeQty}
				    format={userFormat.time}
				/>
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