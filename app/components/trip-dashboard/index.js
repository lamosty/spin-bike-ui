import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';
import TimeInterval from '../time-interval';
import ResistanceInput from '../resistance-input';

export default class TripDashboard extends Component {
	renderMeters() {
		const { currentTrip, user, changeResistanceLevel } = this.props;

		const userFormat = user.dashboardFormat;
		const resistanceLevels = user.resistanceLevels;

		return (
			<div>
				<NumberUnit
					title="speed"
					quantity={currentTrip.speedQty}
					format={userFormat.speed}
				/>
				<NumberUnit
					title="average speed"
					quantity={currentTrip.avgSpeedQty}
					format={userFormat.avgSpeed}
				/>
				<NumberUnit
					title="distance"
					quantity={currentTrip.distanceQty}
				    format={userFormat.distance}
				/>
				<TimeInterval
					title="moving time"
					quantity={currentTrip.movingTimeQty}
				    format={userFormat.time}
				/>
				<TimeInterval
					title="total time"
					quantity={currentTrip.totalTimeQty}
					format={userFormat.time}
					/>

				<ResistanceInput levels={resistanceLevels} changeResistanceLevel={changeResistanceLevel} />
			</div>
		);
	}

	render() {

		const { startTrip, stopTrip, isTripRunning, isMoving } = this.props;

		return (
			<div className={styles.dashboard}>
				TripDashboard
				<button onClick={startTrip}>Start Trip</button>
				<button onClick={stopTrip}>Stop Trip</button>
				{isTripRunning ? this.renderMeters() : null}
				{isMoving ? 'moving' : 'not moving'}
			</div>
		)
	}
}