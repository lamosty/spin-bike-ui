import React, { Component } from 'react';

export default class NumberUnit extends Component {
	renderQuantity(quantity, format) {
		if (typeof quantity === 'undefined') {
			return (
				<div>-|-</div>
			);
		}

		const formattedQuantity = quantity.to(format).toPrec(0.01);

		return [
			<span key="value">{formattedQuantity.scalar}</span>,
			<span key="unit">{formattedQuantity.units()}</span>
		];
	}

	render() {
		const { title, quantity, format } = this.props;

		return (
			<div>
				<div>{title}</div>
				<div>
					{this.renderQuantity(quantity, format)}
				</div>
			</div>
		);
	}
}

// TODO: Add PropTypes required.