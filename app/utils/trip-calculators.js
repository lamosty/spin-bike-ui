export function speed(pulseData) {
	const wheelDiameter = 6.6; //in meters

	return 3.6 * (wheelDiameter / pulseData.secondsBetweenPulses);
	// TODO: find library for converting between m/s to km/s.
}