import RpmMeter, { PULSE_EVENT } from 'spin-bike-rpm-meter';
import { startTripClock } from '../utils/action-helpers';
import moment from 'moment';

export const START_TRIP = 'START_TRIP';
export const STOP_TRIP = 'STOP_TRIP';
export const GET_TRIP_DATA = 'GET_TRIP_DATA';
export const TICK_TRIP_CLOCK = 'TICK_TRIP_CLOCK';
export const STOP_MOVING = 'STOP_MOVING';
export const CHANGE_RESISTANCE_LEVEL = 'CHANGE_RESISTANCE_LEVEL';
export const START_TRIP_ERROR = 'START_TRIP_ERROR';

export function startTrip() {
	return function(dispatch, getState) {
		const rpmMeter = new RpmMeter();

		return rpmMeter.start()
			.then(stopFunction => {

				// Start trip clock for calculating total elapsed time.
				const tripClock = startTripClock(() => {

					// 1. Dispatch tick action each second (clock interval is 1s).
					dispatch(tickTripClockAction());
				});

				// 2. Dispatch action that trip was started.
				dispatch(startTripAction(
					rpmMeter,
					stopFunction,
					tripClock,
					moment().unix()
				));

				// Listen to RPMMeter "pulses" (revolutions of pedals on spin bike).
				rpmMeter.on(PULSE_EVENT, pulseData => {
					const state = getState();

					let { movingThresholdTimeout } = state.tripDashboard;

					clearTimeout(movingThresholdTimeout);

					movingThresholdTimeout = setTimeout(() => {

						// 3. Dispatch a stop moving action if cyclist hasn't made a revolution of pedals on his/her
						// bike in the last 2 seconds.
						dispatch(stopMovingAction());
					}, 2000);

					// 4. Dispatch action that a full revolution of pedals on stationary bike was made.
					// Include secondsBetweenPulses (= revolutions) in pulseData object.
					dispatch(getTripDataAction(pulseData, movingThresholdTimeout));
				});
			}).catch(() => {
				dispatch(startTripErrorAction());
			});
	}
}

export function stopTrip() {
	return function(dispatch, getState) {
		const state = getState();

		const { stopFunction, tripClock } = state.rpmMeter;

		stopFunction();
		tripClock.stop();
		dispatch(stopTripAction(
			moment().unix()
		));
	}
}

export function changeResistanceLevel(newLevelId) {
	let time = moment().unix();

	return {
		type: CHANGE_RESISTANCE_LEVEL,
		payload: {
			levelId: newLevelId,
			time: time

		}
	}
}

function startTripErrorAction() {
	return {
		type: START_TRIP_ERROR,
		payload: {
			startTripError: true
		}
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

function startTripAction(rpmMeter, stopFunction, tripClock, startTime) {
	return {
		type: START_TRIP,
		payload: {
			rpmMeter,
			stopFunction,
			tripClock,
			startTime
		}
	};
}

function stopTripAction(stopTime) {
	return {
		type: STOP_TRIP,
		payload: {
			stopTime
		}
	}
}