import { Injectable } from "@angular/core";
import { DeviceCoordinates } from "src/app/model/geofencing";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class GoogleMapLoader {
  loadGoogleMap(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    // do not reload if loaded b4
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      //  access maps script sdk
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApi}&libraries=geometry,drawing`;
      script.async = true;
      script.defer = false;

      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps not loaded");
        }
      };
    });
  }

  viewGeofenceInfo(
    anchor,
    desc: string,
    GoogleMap,
    map,
    marker = false,
    open = false
  ) {
    const displayInfo = new GoogleMap.InfoWindow({
      content: desc,
    });

    if (open) {
      displayInfo.open({ anchor, map: map, shouldFocus: false });
    } else if (marker) {
      anchor.addListener("click", () => {
        displayInfo.open({ anchor, map: map, shouldFocus: false });
      });
    } else {
      anchor.addListener("click", (e) => {
        displayInfo.setPosition(e.latLng);
        displayInfo.open(map);
      });
    }

    return displayInfo
  }
}
