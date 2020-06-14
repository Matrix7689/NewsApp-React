import React, { Component } from "react";

class Vehicles extends Component {
	render() {
		return (
			<div className='expanddesc'>
				{this.props.info}
			</div>
		);
	}
}

export default Vehicles;
