import React, { Component } from 'react';
import MainNav from '../components/main-nav';
import styles from '../assets/global-styles.css';

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