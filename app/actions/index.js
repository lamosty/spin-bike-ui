import RpmMeter, { PULSE_EVENT } from 'spin-bike-rpm-meter';
import { startTripClock } from '../utils/action-helpers';

export const START_LISTENING_TO_PULSES = 'START_LISTENING_TO_PULSES';
export const GET_PULSE_DATA = 'GET_PULSE_DATA';
export const STOP_LISTENING_TO_PULSES = 'STOP_LISTENING_TO_PULSES';
export const ON_TRIP_CLOCK_TICK = 'ON_TRIP_CLOCK_TICK';
export const STOPPED_MOVING = 'STOPPED_MOVING';

export function startRpmMeter() {
	return function(dispatch, getState) {
		const rpmMeter = new RpmMeter();

		return rpmMeter.start()
			.then(stopFunction => {
				const tripClock = startTripClock(() => {
					dispatch(onTripClockTick());
				});

				dispatch(startListeningToPulses(rpmMeter, stopFunction, tripClock));

				rpmMeter.on(PULSE_EVENT, pulseData => {
					const state = getState();

					let { movingThresholdTimeout } = state.trip;

					clearTimeout(movingThresholdTimeout);

					movingThresholdTimeout = setTimeout(() => {
						dispatch(stoppedMoving());

					}, 2000);

					dispatch(getPulseData(pulseData, movingThresholdTimeout));
				});
			});
	}
}

function stoppedMoving() {
	return {
		type: STOPPED_MOVING,
		payload: {
			isMoving: false
		}
	}
}

function onTripClockTick() {
	return {
		type: ON_TRIP_CLOCK_TICK
	}
}

function getPulseData(pulseData, movingThresholdTimeout) {
	return {
		type: GET_PULSE_DATA,
		payload: {
			pulseData,
			movingThresholdTimeout
		}
	};
}

function startListeningToPulses(rpmMeter, stopFunction, tripClock) {
	return {
		type: START_LISTENING_TO_PULSES,
		payload: {
			rpmMeter,
			stopFunction,
			tripClock
		}
	};
}

export function stopRpmMeter() {
	return function(dispatch, getState) {
		const state = getState();

		const { stopFunction, tripClock } = state.rpmMeter;

		stopFunction();
		tripClock.stop();
		dispatch(stopListeningToPulses());
	}
}

function stopListeningToPulses() {
	return {
		type: STOP_LISTENING_TO_PULSES
	}
}