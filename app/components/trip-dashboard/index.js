import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';
import TimeInterval from '../time-interval';
import ResistanceInput from '../resistance-input';

export default class TripDashboard extends Component {
	renderMeters() {
		const { tripData, user } = this.props;

		const userFormat = user.dashboardFormat;
		const resistanceLevels = user.resistanceLevels;

		return (
			<div>
				<NumberUnit
					title="speed"
					quantity={tripData.speedQty}
					format={userFormat.speed}
				/>
				<NumberUnit
					title="average speed"
					quantity={tripData.avgSpeedQty}
					format={userFormat.avgSpeed}
				/>
				<NumberUnit
					title="distance"
					quantity={tripData.distanceQty}
				    format={userFormat.distance}
				/>
				<TimeInterval
					title="moving time"
					quantity={tripData.movingTimeQty}
				    format={userFormat.time}
				/>
				<TimeInterval
					title="total time"
					quantity={tripData.totalTimeQty}
					format={userFormat.time}
					/>

				<ResistanceInput levels={resistanceLevels} />
			</div>
		);
	}

	render() {

		const { startTrip, stopTrip, isTripRunning, tripData } = this.props;

		return (
			<div className={styles.dashboard}>
				TripDashboard
				<button onClick={startTrip}>Start Trip</button>
				<button onClick={stopTrip}>Stop Trip</button>
				{isTripRunning ? this.renderMeters() : null}
				{tripData.isMoving ? 'moving' : 'not moving'}
			</div>
		)
	}
}