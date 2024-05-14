import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DashboardHttpService } from 'src/app/service/dashboard-http.service';
import { GoogleMapLoader } from '../../sdk/geofencing/google-map-loader';
import { tap } from 'rxjs/operators';
import { Points } from 'src/app/model/geofencing';

@Component({
  selector: 'app-device-location',
  templateUrl: './device-location.component.html',
  styleUrls: ['./device-location.component.scss'],
})
export class DeviceLocationComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElementRef: ElementRef;
  @Input() latitude: any;
  @Input() longitude: any;

  map: any;
  GoogleMap;
  bounds: any;
  marker: any;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;

  constructor(
    private renderer: Renderer2,
    private gMapLoader: GoogleMapLoader,
    // private toastService: ToastrService,
    private readonly dashboard: DashboardHttpService
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    const mapControls = {
      zoom: 14,
      center: { lat: this.latitude, lng: this.longitude },
      streetViewControl: false,
    };

    this.gMapLoader.loadGoogleMap().then((googleMaps) => {
      this.GoogleMap = googleMaps;
      const mapElement = this.mapElementRef.nativeElement;

      this.map = new googleMaps.Map(mapElement, mapControls);

      googleMaps.event.addListenerOnce(this.map, 'idle', () => {
        this.renderer.addClass(mapElement, 'visible');
      });

      this.bounds = new this.GoogleMap.LatLngBounds();

      //marker object
      this.marker = new this.GoogleMap.Marker({
        icon: '',
        title: 'static text',
        position: { lat: this.latitude, lng: this.longitude },
        map: this.map,
      });

      this.fetchGoogleStreet(mapControls.center);

      return this.dashboard
        .geofenceDetail(this.latitude.toString(), this.longitude.toString())
        .pipe(
          tap((address) => {
            if (!address || !address.results || !address.results.length) {
              address.results.push({
                formatted_address:
                  '<div>device address unavailable at the moment</div',
              });
            }
            const formatted_address = `<div style="color:black">${address.results[0].formatted_address}</div`;

            this.gMapLoader.viewGeofenceInfo(
              this.marker,
              formatted_address,
              this.GoogleMap,
              this.map,
              true,
              true
            );
          })
        )
        .subscribe();
    });
    // .catch((e) => this.toastService.error("Map cannot be loaded", ""));
  }

  updateMapView(): void {
    this.map.addListener('click', (mouseEvent) => {
      this.fetchGoogleStreet({
        lat: mouseEvent.latLng.lat(),
        lng: mouseEvent.latLng.lng(),
      });
    });
  }

  toggleView(): void {
    this.togglePanoramaState = this.panorama.getVisible();

    if (this.togglePanoramaState === false) {
      this.panorama.setVisible(true);
    } else {
      this.panorama.setVisible(false);
    }

    // this controls the template state
    this.togglePanoramaState = !this.togglePanoramaState;
  }

  fetchGoogleStreet(location: Points): void {
    new this.GoogleMap.StreetViewService()
      .getPanorama({
        location,
        radius: 100,
      })
      .then(({ data }) => {
        this.showPanorama = true;
        this.processStreetViewData(data);
      })
      .catch(() => (this.showPanorama = false));
  }

  processStreetViewData(data): void {
    const location = data.location;
    this.panoramaView(location.pano);
  }

  panoramaView(location: Points): void {
    this.panorama = this.map.getStreetView();

    this.panorama.setPano(location);

    this.panorama.setPov({ heading: 265, pitch: 0 });

    this.map.setStreetView(this.panorama);
  }
}
