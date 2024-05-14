import { SmartHomeDevices } from "./asset";
import { DeviceStatDetail } from "./company";

export interface SmartHomeDashboard {
  floorNumber: number;
  floorName: string;
  devices: SmartHomeDevices[];
}

export interface DeviceAttr {
  attribute: string;
  attributeValue: string;
  icon: string[];
  color: string;
}

// export interface SmartHomeDevices {
//   deviceId: string;
//   manufDeviceId: string;
//   deviceName: string;
//   lastSeenMsgId: string;
//   lastSeenDate: Date;
//   companyId: string;
//   companyName: string;
//   deviceCategName: string;
//   clientDeviceCategId: string;
//   network: string;
//   networkName: string;
//   floorNumber: number;
//   floorName: string;
//   utcTimestamp:string
//   subscrEndDate:string
//   subscrStartDate:string
//   attributes:DeviceStatDetail[]
// }




