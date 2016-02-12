// TODO: get this from user profile. Meanwhile, use @lamosty's bike.
function toUserSpeedUnit(speedQty) {
	return speedQty.to('km/h').toPrec(0.01);
}

function toUserTimeUnit(timeQty) {
	return timeQty.to('h');
}

function toUserDistanceUnit(distanceQty) {
	return distanceQty.to('km').toPrec(0.01);
}
