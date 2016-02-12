import React, { Component } from 'react';

export default class NumberUnit extends Component {
	render() {
		const { title, quantity } = this.props;

		let number = '';
		let unit = '';

		if (typeof quantity !== 'undefined') {
			number = quantity.scalar;
			unit = quantity.units();
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