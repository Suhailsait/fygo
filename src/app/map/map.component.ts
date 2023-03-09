import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map:any = mapboxgl.Map;
  marker:any = mapboxgl.Marker
  geocoder:any = MapboxGeocoder;
  lngLat: any;

  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl
    });
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);

      
      this.map = new mapboxgl.Map({
        container: 'map',
        style:'mapbox://styles/mapbox/streets-v11',
        // pitch: 60,
        // bearing: -60,
        zoom:10,
        center: [position.coords.longitude, position.coords.latitude],
      });
      
      this.buildMap();
    });
    
    this.map.addControl(this.geocoder);
    // this.geocoder.on('result', (event:any) => {
    //   console.log('User location:', event.result.center);
    // });
    // navigator.geolocation.watchPosition((position) => {
    // });
  }

  buildMap() {
   
    this.map.addControl(new mapboxgl.NavigationControl());
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });
    this.map.addControl(geolocate);
    this.map.on('load', () => {
      geolocate.trigger();
    });

    this.map.on('click', (event: any) => {
      this.lngLat = event.lngLat;
      if (this.marker != this.lngLat) {
        this.marker.remove();
      }
      console.log(this.lngLat);
    });
    
  }

  
  addmark() {

    // if (this.marker) {
    //   this.marker.remove();
    // }

    this.marker = new mapboxgl.Marker({
      color: 'red',
      draggable: true,
    }).setLngLat([this.lngLat.lng, this.lngLat.lat])
      .addTo(this.map);
  }
  // const popup = new mapboxgl.Popup()
  //   .setHTML('<h3>Hello world!</h3>')
  //   .addTo(this.map);
  // marker.setPopup(popup);

}
