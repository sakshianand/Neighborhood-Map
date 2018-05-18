
import React, { Component } from 'react';

class SideNav extends Component {
	state={
		query:'',
		filter:''
	}
	filter = (event)=>{
		var filterLocation = [];
		this.props.places.forEach((marker)=>{
			if(marker.title.toLowerCase().indexOf(event.target.value)>=0) {
				marker.setVisible(true);
				filterLocation.push(marker);
			}
			else
			{
				marker.setVisible(false);
			}
		});
		this.setState({
			filter:filterLocation
		})
	}
	componentWillMount()
		{
			this.setState({
					filter:this.props.places
				})
		}
	

	render= ()=>{
		return (
			<div id="nav">
			<input type="text" placeholder="filter places by name" id="filter" onChange={this.filter}/>
				<ul id="list-items">
				{
					this.state.filter.map((mark,index)=>{
					return(<li key={index} className="elem" onClick={this.props.openInfoWindow.bind(this,mark)} value={this.state.query}>{mark.title}</li>)

				})

			}
				
			</ul>
			</div>
		);

}
}
export default SideNav