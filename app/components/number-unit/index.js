import React, { Component } from 'react';
import Numeral from 'numeral';

export default class NumberUnit extends Component {
	renderQuantity(quantity, format) {
		if (typeof quantity === 'undefined') {
			return (
				<div>-|-</div>
			);
		}

		if (quantity.kind() === 'time') {
			quantity = quantity.to('s');
			
			let seconds = quantity.scalar;

			return (
				<span>{Numeral(seconds).format('00:00:00')}</span>
			);
		}

		quantity = quantity.to(format).toPrec(0.01);

		return (
			<div>
				<span>{quantity.scalar}</span> <span>{quantity.units()}</span>
			</div>
		);
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