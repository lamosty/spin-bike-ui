import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';

export default class Dashboard extends Component {
	renderMeters() {
		const { tripInfo } = this.props;

		// TODO: format totalTime to h:min:s
		// TODO: make sure speed/avgSpeed is calculated properly
		return (
			<div>
				<NumberUnit title="" quantity={tripInfo.speedQty} />
				<NumberUnit title="average speed" quantity={tripInfo.avgSpeedQty} />
				<NumberUnit title="total distance" quantity={tripInfo.totalDistanceQty} />
				<NumberUnit title="total time" quantity={tripInfo.totalTimeQty} />
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