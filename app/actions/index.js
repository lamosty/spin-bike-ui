import RpmMeter, { PULSE_EVENT } from 'spin-bike-rpm-meter';

export const START_LISTENING_TO_PULSES = 'START_LISTENING_TO_PULSES';
export const GET_PULSE_DATA = 'GET_PULSE_DATA';

export function startRpmMeter() {
	return function(dispatch) {
		const rpmMeter = new RpmMeter();

		return rpmMeter.start()
			.then(stopFunction => {
				dispatch(startListeningToPulses(rpmMeter, stopFunction));

				rpmMeter.on(PULSE_EVENT, pulseData => {
					dispatch(getPulseData(pulseData));
				});
			});
	}
}

function getPulseData(pulseData) {
	return {
		type: GET_PULSE_DATA,
		payload: pulseData
	};
}

function startListeningToPulses(rpmMeter, stopFunction) {
	return {
		type: START_LISTENING_TO_PULSES,
		payload: {
			rpmMeter,
			stopFunction
		}
	};
}