import React, { Component } from 'react';

export default class ResistanceInput extends Component {
	renderLevels() {
		const { levels } = this.props;

		return levels.map((level) => {
			return <option key={level.id} value={level.id}>{level.title}</option>
		});
	}

	render() {
		return (
			<div>
				Resistance level
				<select>
					{this.renderLevels()}
				</select>
			</div>
		);
	}
}