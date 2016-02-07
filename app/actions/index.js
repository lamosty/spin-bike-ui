import RpmMeter from 'spin-bike-rpm-meter';

export const START_LISTENING_TO_PULSES = 'START_LISTENING_TO_PULSES';

export function startRpmMeter() {
	return function(dispatch) {
		const rpmMeter = new RpmMeter();

		return rpmMeter.start()
			.then(stopFunction => {
				console.log('Starting listening to pulses...'); // Refactor to standard logging routine.

				dispatch(startListeningToPulses(rpmMeter, stopFunction));
			});
	}
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