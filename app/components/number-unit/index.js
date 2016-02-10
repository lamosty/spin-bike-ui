import React, { Component } from 'react';

export default class NumberUnit extends Component {
	render() {
		const { title, numberQty } = this.props;

		let number = '';
		let unit = '';

		if (typeof numberQty !== 'undefined') {
			number = numberQty.scalar;
			unit = numberQty.units();
		}

		return (
			<div>
				<div>{title}</div>
				<div>
					<span>{number}</span> <span>{unit}</span>
				</div>
			</div>
		);
	}
}

// TODO: Add PropTypes required.