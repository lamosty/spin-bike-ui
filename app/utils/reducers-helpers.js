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

export function getCurrentTrip(trips = []) {
	return trips[trips.length - 1];
}
