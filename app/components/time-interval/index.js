import React, { Component } from 'react';
import Numeral from 'numeral';

export default class TimeInterval extends Component {
	renderQuantity(quantity, format) {
		if (quantity == null) {
			return (
				<span className="number"><p>-|-</p></span>
			);
		}

		const seconds = quantity.to('s').scalar;

		return <span className="number"><p>{Numeral(seconds).format(format)}</p></span>;
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