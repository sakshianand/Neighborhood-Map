/*global google*/
import React, { Component } from 'react';
import SideNav from './SideNav';
class App extends Component {
      state={
        places:[
          {
            name:'Gautam Buddha Park',
            lat:26.8868226,
            lng:81.00256
          },
          {
            name:'Shekhar Hospital',
            lat:26.8762089,
            lng:80.98547169999999
          },
          {
            name: 'Lucknow Public School',
            lat:26.8967693,
            lng:80.9989138
          },
            {
            name:'Delhi Public School',
            lat:26.8873994,
            lng:80.98874769999999
          },
          {
            name:'SKD Academy',
            lat:26.872414,
            lng:81.0165672
          }
        ],
        map:'',
        markers:[],
        infowindow:''      
      }

  //Loding Map Reference take from http://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
      componentDidMount=()=> {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
        // Asynchronously load the Google Maps script, passing in the callback reference
        loadMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCPi0o_tjNjKYYDe_6nYg82r0leI7kKlOE&callback=initMap')
    }
    //Initializtion of Map
   initMap=()=> {
    //Constructor creates a new map - only center and zoom are required
      var map = new google.maps.Map(document.getElementById('map'),{
            center: {lat: 26.8798933, lng: 80.9926327},
            zoom: 14
      });
      this.setState({
        map:map
      })
     //Setting the bounds of the Map(It will autozoom and pan itself depending on screen size)
     var bounds  = new google.maps.LatLngBounds();
     var mark=[];
      this.state.places.forEach(loc=>{
         var  marker = new google.maps.Marker({
          position:{lat: loc.lat, lng: loc.lng},
          map:map,
          title:loc.name,
          animation:window.google.maps.Animation.DROP
        }) 
         mark.push(marker);
         var loca = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
         bounds.extend(loca);
        google.maps.event.addListener(marker,'click',()=> {
         this.openInfoWindow(marker);
        })
    })
     //console.log(mark);
      this.setState({
        markers:mark
      })
      
       //Get current center
      var c = map.getCenter();
      //Use event listener for resize on window
      google.maps.event.addDomListener(window, 'resize', ()=> {
         //Set Center
         this.state.map.setCenter(c);
         this.state.map.fitBounds(bounds);       
        this.state.map.panToBounds(bounds);
      });
     
      var infowindow = new google.maps.InfoWindow({
        
    });
      this.setState({
        infowindow:infowindow
      })


    }
       openInfoWindow=(marker)=>{
         marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2100);
        this.state.map.setCenter(marker.getPosition());

         var clientId = 'MD3R551MPX1GBICC5GAKFB0O1LYMZFKRTQM1JU245YWH0MX1'
         var clientSecret = 'JGFGMGK3WAHTJKVA5HBNYRL5LYK0I1KQS5MRH5VWBYDNISOW'
         var lat = marker.getPosition().lat();
         var lng = marker.getPosition().lng();
         var url = "https://api.foursquare.com/v2/venues/search?client_id="+clientId+"&client_secret="+clientSecret+"&v=20180516&ll="+lat+","+lng+"";
         
         this.state.infowindow.setContent("Loading Data..")
         fetch(url)
          .then((res)=>{
            if(res.status !==200)
            {
              this.state.infowindow.setContent('Error in fetching data');
              return;
            }
            res.json()
            .then((data)=>{
              var json=data.response.venues[0];
              

              fetch("https://api.foursquare.com/v2/venues/"+json.id+"/?client_id="+clientId+"&client_secret="+clientSecret+"&v=20180516")
                .then((resp)=>{
                  resp.json()
                    .then(data=>{
                      var d = data.response.venue;
                      console.log(d);
                      this.state.infowindow.setContent(`According to the details on Foursquare Website : <br>Number of Tips : ${d.tips.count}<br>Number of Likes by the User : ${d.likes.count} Likes`)

                    })
                })
              //infowindow.setContent(json.name)
            })
          })

         this.state.infowindow.open(this.state.map,marker);
      }
  render=()=> {
    return (

      <div id="container">
        <SideNav places={this.state.markers} openInfoWindow={this.openInfoWindow} />  
        <div id="map-container" role="application" tabIndex="-1">
          <div id="map" style={{ 
                          height: window.innerHeight + "px",
                         
                           }}>
          </div>
        </div>
      </div>
        
    );
  }
}

export default App;

function loadMapJS(src) {

  var ref = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src=src;
  script.async=true;
  script.onerror = ()=>{
    document.getElementById('map').innerHTML="Script did not load.Ther is some Error!"
  }
  ref.parentNode.insertBefore(script,ref);
}