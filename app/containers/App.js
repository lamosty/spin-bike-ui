import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;

		return children;
	}
}