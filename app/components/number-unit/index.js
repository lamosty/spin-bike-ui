import React, { Component } from 'react';

export default class NumberUnit extends Component {
	renderQuantity(quantity, format) {
		if (quantity == null) {
			return (
				<span className="number"><p>-|-</p></span>
			);
		}

		const formattedQuantity = quantity.to(format).toPrec(0.01);

		return [
			<span className="number" key="value"><p>{formattedQuantity.scalar}</p></span>,
			<span className="unit" key="unit"><p>{formattedQuantity.units()}</p></span>
		];
	}

	render() {
		const { title, quantity, format, className } = this.props;

		return (
			<div className={className}>
				<h3>{title}</h3>
				{this.renderQuantity(quantity, format)}
			</div>
		);
	}
}

// TODO: Add PropTypes required.