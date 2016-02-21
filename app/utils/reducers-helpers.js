export function createResistanceRecordId(resistanceRecords) {
	if (resistanceRecords.length === 0) {
		return 1;
	}

	let lastRecordId = resistanceRecords[resistanceRecords.length - 1].id;

	return lastRecordId + 1;
}

export function getLastResistanceRecord(resistanceRecords) {
	return resistanceRecords[resistanceRecords.length - 1];
}

export function createTripId(trips) {
	if (trips.length === 0) {
		return 1;
	}

	let lastTripId = trips[trips.length - 1].id;

	return lastTripId + 1;
}

export function getCurrentTrip(trips = [{
	speedQty: null,
	distanceQty: null,
	avgSpeedQty: null,
	totalTimeQty: null,
	movingTimeQty: null
}]) {
	return trips[trips.length - 1];
}
