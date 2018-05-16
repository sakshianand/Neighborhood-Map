import React, { Component } from 'react';

class SideNav extends Component {
	state={
		markers:[]
	}
	componentDidMount() {
        this.setState({markers: this.props.places});
    }
	render = ()=>{
		return (
			<ul>
			{this.state.markers.map(mark=>{
				<li>{mark.title}</li>
			})}
			
			</ul>
		);

}
}
export default SideNav;