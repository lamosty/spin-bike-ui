import React, { Component } from 'react';

export default class NumberUnit {
	render() {
		const { title, number, unit } = this.props;

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