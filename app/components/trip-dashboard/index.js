import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';
import TimeInterval from '../time-interval';

export default class TripDashboard extends Component {
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
					title="distance"
					quantity={tripInfo.distanceQty}
				    format={userFormat.distance}
				/>
				<TimeInterval
					title="moving time"
					quantity={tripInfo.movingTimeQty}
				    format={userFormat.time}
				/>
				<TimeInterval
					title="total time"
					quantity={tripInfo.totalTimeQty}
					format={userFormat.time}
					/>
			</div>
		);
	}

	render() {

		const { startTrip, stopTrip, isTripRunning, tripInfo } = this.props;

		return (
			<div className={styles.dashboard}>
				TripDashboard
				<button onClick={startTrip}>Start Trip</button>
				<button onClick={stopTrip}>Stop Trip</button>
				{isTripRunning ? this.renderMeters() : null}
				{tripInfo.isMoving ? 'moving' : 'not moving'}
			</div>
		)
	}
}