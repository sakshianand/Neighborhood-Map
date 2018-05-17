
import React, { Component } from 'react';

class SideNav extends Component {

	render= ()=>{
		return (
			<ul id="list-items">
			{
				this.props.places.map((mark,index)=>{
				return(<li key={index} onClick={this.props.openInfoWindow}>{mark.title}</li>)

			})

		}
			
			</ul>
		);

}
}
export default SideNav