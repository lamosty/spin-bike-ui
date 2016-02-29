import React, { Component } from 'react';
import MainNav from '../components/main-nav';
import 'bootstrap-loader';
import '../assets/style.scss';

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;

		return (
			<div>
				<MainNav />
				{children}
			</div>
		);
	}
}