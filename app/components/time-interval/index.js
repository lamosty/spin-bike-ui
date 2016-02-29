import React, { Component } from 'react';
import Numeral from 'numeral';
import classNames from 'classnames';

export default class TimeInterval extends Component {
	renderQuantity(quantity, format) {
		if (quantity == null) {
			return (
				<div className="time-interval__number">-|-</div>
			);
		}

		const seconds = quantity.to('s').scalar;

		return <div className="time-interval__number">{Numeral(seconds).format(format)}</div>;
	}

	render() {
		const { title, quantity, format, className = '', isLarge = false } = this.props;

		let classes = classNames('time-interval', className, {
			'is-large': isLarge
		});

		return (
			<div className={className}>
				<h3 className="time-interval__title">{title}</h3>
				{this.renderQuantity(quantity, format)}
			</div>
		);
	}
}

// TODO: Add PropTypes required.