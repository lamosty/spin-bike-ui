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

export function totalTime(prevTotalTime = new Qty('0s'), timeInS) {
	return toUserTimeUnit(prevTotalTime.add(new Qty(timeInS + 's')));
}

function toUserDistanceUnit(distanceQty) {
	return distanceQty.to('km').toPrec(0.01);
}

export function totalDistance(prevTotalDistance = new Qty('0m'), distanceInM) {
	return toUserDistanceUnit(prevTotalDistance.add(new Qty(distanceInM + 'm')));
}

// TODO: fix this computation.
export function avgSpeed(distanceQty, timeQty) {
	console.log(distanceQty.div(timeQty).toString());
	return toUserSpeedUnit(distanceQty.div(timeQty));

}