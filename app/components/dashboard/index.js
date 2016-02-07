import React, { Component } from 'react';
import styles from './style.css';
import NumberUnit from '../number-unit';

export default class Dashboard extends Component {
	renderMeters() {
		const { speed } = this.props;

		return (
			<div>
				<NumberUnit title="" number={speed} unit="km/h" />
				<NumberUnit title="average speed" number="20" unit="km/h" />
				<NumberUnit title="total distance" number="15" unit="km" />
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