export interface Device {
  deviceId: string;
  deviceName: string;
  manufDeviceId: string;
  companyId: string;
  companyName: string;
  lastSeenMsgId: string;
  lastSeenDate: string;
  deviceStatus: string;
  clientDeviceCategId: string;
  deviceCategName: string;
  subscrStartDate: string;
  subscrEndDate: string;
  subscrValid: string;
  network: string;
  network_name: string;
  useCaseId: string;
  tab1: DeviceTab1[];
}

export interface DeviceTab1 {
  attribute: string;
  attributeValue: string;
  rawMessageId: number;
  devNetwkTime: string;
  showInDashbd: number;
  netwkSeqNo: number;
  dataGroup: string;
}

export interface DevicesLogResponse {
  deviceId: string;
  messages: LogMessages[];
}

export interface LogMessages {
  time: string;
  seqNumber: number;
  deviceLog: devicesLog[];
}

export interface LastStatus {
  data: string;
  value: string;
  date: string;
}

export interface devicesLog {
  dataGroup: string;
  dataGroupAttributes: devicesLogDetails[];
}

export interface devicesLogDetails {
  attribute: string;
  attributeValue: string;
  attributeType:string
}

export interface HistoryData {
  Data: string[];
  'Sequence #': number;
  Type: string;
  Action: string;
  Date: string;
}

export interface LastStatus {
  data: string;
  value: string;
  date: string;
}

export interface sChartData {
  chart_name: string;
  data: any[];
}

export enum DeviceAttributeStatus {
  doorStatus = "DOOR_OPEN_STATUS",
  WaterLeakageStatus = "WATER_LEAK_STATUS",
}

export interface IiconData {
  icon: string[];
  color: string;
}

export enum DeviceMode {
  WiFiMac = "wifi 2macs scanned",
  GPSScanned = "gps scanned",
  WiFi3Mac = "3 wifi macs scanned",
  WiFi2Mac = "2 wifi macs scanned",
}

export enum LinkQuality {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  LIMIT = "LIMIT",
}

export enum DoorAttr {
  mode = "Mode",
  lastDorrDur = "LAST_DOOR_OPEN_DURATION",
  alarm = "ALARM",
  battery = "Battery",
  doorOpenTimes = "DOOR_OPEN_TIMES",
  doorStatus = "DOOR_OPEN_STATUS",
}

export enum PowerStatus {
  Off = "off",
  On = "on",
}

export enum WirelessStatus {
  WiFi = "wifi",
  RSSI = "RSSI",
  SIGFOX = "sigfox",
  LORA = "lora",
  NB = "nb-iot",
  SNR = "SNR",
}

export enum BatteryAttribute {
  BatteryStatus = "Battery Status",
  BatteryLevel = "Battery Level",
  Battery = "Battery",
}

export enum BatteryLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Critical = "Critical",
}
