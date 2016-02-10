import Qty from 'js-quantities';

// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
function toUserSpeedUnit(speedInMs) {
	const speedQty = new Qty(speedInMs + 'm/s');

	return speedQty.to('km/h').toPrec(0.01);
}

export function speed(distance, time) {
	return toUserSpeedUnit(distance / time);
}