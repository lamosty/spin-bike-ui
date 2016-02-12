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

export function totalTime(newTimeInS, prevTotalTimeQty = new Qty('0s')) {
	return toUserTimeUnit(prevTotalTimeQty.add(new Qty(newTimeInS + 's')));
}

function toUserDistanceUnit(distanceQty) {
	return distanceQty.to('km').toPrec(0.01);
}

export function totalDistance(newDistanceInM, prevTotalDistanceQty = new Qty('0m')) {
	return toUserDistanceUnit(prevTotalDistanceQty.add(new Qty(newDistanceInM + 'm')));
}

export function avgSpeed(distanceQty, timeQty) {
	return toUserSpeedUnit(distanceQty.div(timeQty));
}