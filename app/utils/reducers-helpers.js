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