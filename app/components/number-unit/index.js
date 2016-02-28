import React, { Component } from 'react';
import classNames from 'classnames';

export default class NumberUnit extends Component {
	renderQuantity(quantity, format) {
		if (quantity == null) {
			return (
				<div>
					<span className="number-unit_number">-|-</span>
				</div>
			);
		}

		const formattedQuantity = quantity.to(format).toPrec(0.01);

		return (
			<div>
				<div className="number-unit__number">{formattedQuantity.scalar}</div>
				<div className="number-unit__unit">{formattedQuantity.units()}</div>
			</div>
		);
	}

	render() {
		const { title, quantity, format, className = '', isLarge = false } = this.props;

		let classes = classNames('number-unit', className, {
			'is-large': isLarge
		});

		return (
			<div className={classes}>
				<h3 className="number-unit__title">{title}</h3>
				{this.renderQuantity(quantity, format)}
			</div>
		);
	}
}

// TODO: Add PropTypes required.