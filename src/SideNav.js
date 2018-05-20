
import React, { Component } from 'react';

class SideNav extends Component {
	state={
		query:''
	}


	render= ()=>{
		return (
			<div id="nav">
			<input type="text" placeholder="filter places by name" id="filter" aria-label ="filter search" onChange={this.props.filter}/>
				<ul id="list-items" aria-label="list of places" role="navigation">
				{
						this.props.places.map((mark,index)=>{
						return(<li key={index} className="elem" onClick={this.props.openInfoWindow.bind(this,mark)} value={this.state.query} tabIndex={this.props.isOpen?-1:0}>{mark.title}</li>)
					
				})

			}
				
			</ul>
			</div>
		);

}
}
export default SideNav