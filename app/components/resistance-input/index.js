import React, { Component } from 'react';

export default class ResistanceInput extends Component {
	renderLevels() {
		const { levels } = this.props;

		return levels.map((level) => {
			return <option key={level.id} value={level.id}>{level.title}</option>
		});
	}

	render() {
		const { changeResistanceLevel } = this.props;

		return (
			<div>
				Resistance level
				<select onChange={(event) => changeResistanceLevel(parseInt(event.target.value))}>
					{this.renderLevels()}
				</select>
			</div>
		);
	}
}