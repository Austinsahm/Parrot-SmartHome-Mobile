export interface Geofencing {}

export interface DeviceCoordinates extends Points {
  time: string;
  seqNumber: number;
}

export interface Points {
  lat: number;
  lng: number;
  index?: number;
}

export interface AddressData {
    results: [{ formatted_address: string }];
  }