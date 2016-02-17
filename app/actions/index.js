import RpmMeter, { PULSE_EVENT } from 'spin-bike-rpm-meter';
import { startTripClock } from '../utils/action-helpers';

export const START_TRIP = 'START_TRIP';
export const STOP_TRIP = 'STOP_TRIP';
export const GET_TRIP_DATA = 'GET_TRIP_DATA';
export const TICK_TRIP_CLOCK = 'TICK_TRIP_CLOCK';
export const STOP_MOVING = 'STOP_MOVING';

export function startTrip() {
	return function(dispatch, getState) {
		const rpmMeter = new RpmMeter();

		return rpmMeter.start()
			.then(stopFunction => {
				const tripClock = startTripClock(() => {
					dispatch(tickTripClockAction());
				});

				dispatch(startTripAction(rpmMeter, stopFunction, tripClock));

				rpmMeter.on(PULSE_EVENT, pulseData => {
					const state = getState();

					let { movingThresholdTimeout } = state.trip;

					clearTimeout(movingThresholdTimeout);

					movingThresholdTimeout = setTimeout(() => {
						dispatch(stopMovingAction());

					}, 2000);

					dispatch(getTripDataAction(pulseData, movingThresholdTimeout));
				});
			});
	}
}

export function stopTrip() {
	return function(dispatch, getState) {
		const state = getState();

		const { stopFunction, tripClock } = state.rpmMeter;

		stopFunction();
		tripClock.stop();
		dispatch(stopTripAction());
	}
}

function stopMovingAction() {
	return {
		type: STOP_MOVING,
		payload: {
			isMoving: false
		}
	}
}

function tickTripClockAction() {
	return {
		type: TICK_TRIP_CLOCK
	}
}

function getTripDataAction(pulseData, movingThresholdTimeout) {
	return {
		type: GET_TRIP_DATA,
		payload: {
			pulseData,
			movingThresholdTimeout
		}
	};
}

function startTripAction(rpmMeter, stopFunction, tripClock) {
	return {
		type: START_TRIP,
		payload: {
			rpmMeter,
			stopFunction,
			tripClock
		}
	};
}

function stopTripAction() {
	return {
		type: STOP_TRIP
	}
}