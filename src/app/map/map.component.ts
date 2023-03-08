import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 0;
  lng = 0;
  zoom = 10;
  marker: mapboxgl.Marker | undefined;
  lngLat: any;

  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

      this.buildMap(position.coords.latitude, position.coords.longitude);
    });

    // navigator.geolocation.watchPosition((position) => {
    // });
  }

  buildMap(lat: any, lng: any) {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      // pitch: 60,
      // bearing: -60,
      zoom: this.zoom,
      center: [lng, lat],
    });
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
      console.log(this.lngLat);
    });

    new mapboxgl.Marker({
      color: 'red',
      draggable: true,
    })
      .setLngLat([this.lngLat.lng, this.lngLat.lat])
      .addTo(this.map);

    console.log(this.lngLat.lng);
  }

  onMapClick(event: any) {}
  // const popup = new mapboxgl.Popup()
  //   .setHTML('<h3>Hello world!</h3>')
  //   .addTo(this.map);
  // marker.setPopup(popup);

  // onMapClick(event){
  // this.map.on('click', (event) => {
  //   if (this.marker) {
  //     this.marker.remove();
  //   }

  //   const marker = new mapboxgl.Marker({
  //     color:'red',
  //   })
  //     .setLngLat(event.lngLat)
  //     .addTo(this.map);
  //     // console.log(event.lngLat);

  // });
  // }
}
