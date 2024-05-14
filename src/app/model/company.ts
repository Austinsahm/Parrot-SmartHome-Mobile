export type CompanyType = 'CORPORATE' | 'PARTNER' | 'INDIVIDUAL';

export interface DeviceStatDetail {
  deviceId: string;
  deviceName: string;
  manufDeviceId: string;
  companyId: string;
  companyName: string;
  lastSeenMsgId: string;
  lastSeenDate: string;
  itemList: any[];
  tab1: any[];
  tab2?: any[];
  tab3?: any[];
  tab4?: any[];
  tab5?: any;
  tab6?: any;
  deviceStatus: string;
  clientDeviceCategId: string;
  deviceCategName: string;
  tab7?: any[];
  subscrValid: string;
  network: string;
  network_name: string;
   subscriptionMsg:string|null
}

export interface DataDetails {
  deviceId: string;
  tab3: boolean;
  tab4: boolean;
  tab5: boolean;
  deviceName: string;
  manufDeviceId: string;
  latitude: Number;
  longitude: Number;
}

export interface DeviceAttribute {
  attribute: string;
  attributeValue: string;
  attributeType: string;
  rawMessageId: string;
  devNetwkTime: string;
  showInDashbd: string;
  deviceIcon?: string[];
  iconColor?: string;
  netwkSeqNo?: number;
  dataGroup: any;
}
