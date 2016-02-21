import React, { Component } from 'react';

export default class ResistanceInput extends Component {
	renderLevels() {
		const { levels } = this.props;

		if (levels.length === 0) {
			return <option>-|-</option>
		}

		return levels.map((level) => {
			return <option key={level.id} value={level.id}>{level.title}</option>
		});
	}

	render() {
		const { changeResistanceLevel, className } = this.props;

		return (
			<div className={className}>
				<figure>
					<figcaption>Resistance Level</figcaption>
					<select onChange={(event) => changeResistanceLevel(parseInt(event.target.value))}>
						{this.renderLevels()}
					</select>
				</figure>
			</div>
		);
	}
}