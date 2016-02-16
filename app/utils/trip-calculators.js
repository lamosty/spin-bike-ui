import Qty from 'js-quantities';

export function speed(distanceInM, timeInS) {
	return new Qty( (distanceInM / timeInS) + 'm/s');
}

export function movingTime(newTimeInS, prevMovingTimeQty = new Qty('0s')) {
	return prevMovingTimeQty.add(new Qty(newTimeInS + 's'));
}

export function totalTime(prevTotalTimeQty = new Qty('0s')) {
	return prevTotalTimeQty.add(new Qty('1s'));
}

export function distance(newDistanceInM, prevDistanceQty = new Qty('0m')) {
	return prevDistanceQty.add(new Qty(newDistanceInM + 'm'));
}

export function avgSpeed(distanceQty, timeQty) {
	return distanceQty.div(timeQty);
}