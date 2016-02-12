import Qty from 'js-quantities';

export function speed(distanceInM, timeInS) {
	return new Qty( (distanceInM / timeInS) + 'm/s');
}

export function totalTime(newTimeInS, prevTotalTimeQty = new Qty('0s')) {
	return prevTotalTimeQty.add(new Qty(newTimeInS + 's'));
}


export function totalDistance(newDistanceInM, prevTotalDistanceQty = new Qty('0m')) {
	return prevTotalDistanceQty.add(new Qty(newDistanceInM + 'm'));
}

export function avgSpeed(distanceQty, timeQty) {
	return distanceQty.div(timeQty);
}