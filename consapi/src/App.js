import React, { Component } from "react";
import api from './api';
import L from 'leaflet';

let map;

function success(pos){

  console.log(pos.coords.latitude, pos.coords.longitude);

  if (map === undefined) {
      map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 3);
  } else {
      map.remove();
      map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 3);
  }

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
      .bindPopup('Eu estou aqui!')
      .openPopup();
}

function error(err){
  console.log(err);
}

class App extends Component{

  state = {
    artigos: [],
  }

  async componentDidMount(){
    const response = await api.get('/books');
    //console.log(response.data)
    this.setState({artigos: response.data});
    // success({ coords: {
    //   latitude: await this.state.artigos[0].latitude,
    //   longitude: await this.state.artigos[0].longitude, 
    //   }})
    await Promise.all(this.state.artigos.map((artigo, index) => {
      if (index === 0){
        success({ coords: {
          latitude: artigo.latitude,
          longitude: artigo.longitude,
        }})
      } else {
        L.marker([artigo.latitude, artigo.longitude]).addTo(map)
        .bindPopup(artigo.title)
        .openPopup();
      }
      }))
  }


  render(){

    const {artigos} = this.state;
    console.log(artigos);

    return(
      <div>
        <h1>Localizacoes</h1>
          <div id="mapid"></div>
      </div>
    );
  };
};

export default App;
