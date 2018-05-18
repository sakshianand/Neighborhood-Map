
import React, { Component } from 'react';

class SideNav extends Component {
	state={
		query:''
	}


	render= ()=>{
		return (
			<div id="nav">
			<input type="text" placeholder="filter places by name" id="filter" onChange={this.props.filter}/>
				<ul id="list-items">
				{
						this.props.places.map((mark,index)=>{
						return(<li key={index} className="elem" onClick={this.props.openInfoWindow.bind(this,mark)} value={this.state.query}>{mark.title}</li>)
					
				})

			}
				
			</ul>
			</div>
		);

}
}
export default SideNav