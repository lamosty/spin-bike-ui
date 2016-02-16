import React, { Component } from 'react';
import Numeral from 'numeral';

export default class TimeInterval extends Component {
	renderQuantity(quantity, format) {
		if (typeof quantity === 'undefined') {
			return (
				<div>-|-</div>
			);
		}

		const seconds = quantity.to('s').scalar;

		return <span>{Numeral(seconds).format(format)}</span>;
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