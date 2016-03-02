import React, { Component } from 'react';
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
				<div className="row">
					<NumberUnit
						title="distance"
						quantity={currentTrip.distanceQty}
						format={userFormat.distance}
						className="col-md-2"
					/>

					<NumberUnit
						title="speed"
						quantity={currentTrip.speedQty}
						format={userFormat.speed}
						className="col-md-8"
						isLarge={true}
					/>

					<TimeInterval
						title="moving time"
						quantity={currentTrip.movingTimeQty}
						format={userFormat.time}
						className="col-md-2"
					/>
				</div>

				<div className="row">
					<NumberUnit
						title="average speed"
						quantity={currentTrip.avgSpeedQty}
						format={userFormat.avgSpeed}
					    className="col-md-2"
					/>

					<ResistanceInput
						levels={resistanceLevels}
						changeResistanceLevel={changeResistanceLevel}
					    className="col-md-8"
					/>

					<TimeInterval
						title="total time"
						quantity={currentTrip.totalTimeQty}
						format={userFormat.time}
					    className="col-md-2"
					/>
				</div>
			</div>
		);
	}

	renderStartTripError() {
		return (
			<h3 className="trip-dashboard__start-trip-error">
				Sorry, but we can't start tracking your trip. Please make sure the cable from your spin bike
				is properly inserted in your computer's microphone slot. Click here for more help
			</h3>
		);
	}

	renderStartBtn() {
		const { startTrip } = this.props;

		return (
			<button
				onClick={startTrip}
				className="btn btn-primary btn-block start-stop-btn"
			>
				Start trip
			</button>
		);
	}

	renderStopBtn() {
		const { stopTrip } = this.props;

		return (
			<button
				onClick={stopTrip}
				className="btn btn-primary btn-block start-stop-btn"
			>
				Stop trip
			</button>
		);
	}

	render() {
		const { isTripRunning } = this.props;

		let button = this.renderStartBtn();

		if (isTripRunning) {
			button = this.renderStopBtn();
		}

		const { startTripError = false } = this.props;

		return (
			<section className="trip-dashboard">
				{startTripError ? this.renderStartTripError() : null}
				{this.renderMeters()}
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-8">{button}</div>
					<div className="col-md-2"></div>
				</div>
			</section>
		)
	}
}