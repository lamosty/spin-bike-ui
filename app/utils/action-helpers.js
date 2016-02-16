import Rolex from 'rolex';

export function startTripClock(onTripClockTick) {
	Rolex.noConflict();

	return Rolex(1000, true, onTripClockTick).start();
}