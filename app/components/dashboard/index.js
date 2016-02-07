import React, { Component } from 'react';
import styles from './style.css';

export default class Dashboard extends Component {
	render() {

		const { startRpmMeter, stopRpmMeter } = this.props;

		return (
			<div className={styles.dashboard}>
				Dashboard
				<button onClick={startRpmMeter}>start rpm meter</button>
				<button onClick={stopRpmMeter}>stop rpm meter</button>
			</div>
		)
	}
}