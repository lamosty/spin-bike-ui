import Qty from 'js-quantities';

// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
function toUserSpeedUnit(speedQty) {
	return speedQty.to('km/h').toPrec(0.01);
}

export function speed(distanceInM, timeInS) {
	let speedQty = new Qty( (distanceInM / timeInS) + 'm/s');

	return toUserSpeedUnit(speedQty);
}

function toUserTimeUnit(timeQty) {
	return timeQty.to('h');
}

export function totalTime(prevTotalTimeQty = new Qty('0s'), timeInS) {
	return toUserTimeUnit(prevTotalTimeQty.add(new Qty(timeInS + 's')));
}

function toUserDistanceUnit(distanceQty) {
	return distanceQty.to('km').toPrec(0.01);
}

export function totalDistance(prevTotalDistanceQty = new Qty('0m'), distanceInM) {
	return toUserDistanceUnit(prevTotalDistanceQty.add(new Qty(distanceInM + 'm')));
}

export function avgSpeed(distanceQty, timeQty) {
	return toUserSpeedUnit(distanceQty.div(timeQty));
}