import { DeviceAttribute } from './company';
export type Notify = 'Y' | 'N';

export interface Asset {
  assetId: string;
  assetName: string;
  location: string;
  assetType: string;
  companyName: string;
  statusName: string;
}

export interface SmartHomeDashboard {
  floorNumber: number;
  floorName: string;
  floorPlanId: string;
  devices: SmartHomeDevices[];
}

export interface Position {
  lat: string;
  lng: string;
}

export interface  SmartHomeDevices {
  [x: string]: any;
  deviceId: string;
  manufDeviceId: string;
  deviceName: string;
  lastSeenMsgId?: string;
  lastseenDate?: string;
  companyId?: string;
  companyName?: string;
  statusId?: string;
  deviceCategName?: string;
  clientDeviceCategId?: string;
  network?: string;
  networkName?: string;
  floorNumber?: number;
  floorName?: string;
  utcTimestamp?: string;
  subscrEndDate?: string;
  subscrStartDate?: string;
  attributes?: DeviceAttribute[];
  pos?: number[];
  expanded?: string ;
  path?: string;
  floorId?: string;
  notificationDue?: Notify;
  position?: Position;
  sensorIcon?: string;
}

export interface FusionChart {
  theme: string;
  caption: string;
  subcaption: string;
  lowerLimit: string;
  upperLimit: string;
  lowerLimitDisplay: string;
  upperLimitDisplay: string;
  numberSuffix: string;
  cylFillColor: string;
  majorTMNumber?: string;
  showValue?: string;
  dataStreamUrl?: string;
  // refreshInterval?: string;
  // refreshInstantly?: string;
  // cylFillHoverColor?: string;
  // cyloriginx?: string;
  // cyloriginy?: string;
  // cylradius?: string;
  // cylheight?: string;
}

export interface FusionDataSource {
  chart: FusionChart;
  value: string;
}

export interface TankAssetResp {
  deviceId: string;
  deviceName: string;
  assetId: string;
  assetName: string;
  totalVolume: number;
  height: number;
  diameter: number;
  realTankLevel: string;
  realVolume: number;
  lat: number;
  lng: number;
}
