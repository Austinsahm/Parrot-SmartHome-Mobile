import { BatteryStatus } from 'src/assets/device.model';
import { DeviceAttribute } from '../model/company';
import {
  BatteryAttribute,
  BatteryLevel,
  DeviceAttributeStatus,
  DeviceMode,
  DoorAttr,
  IiconData,
  LinkQuality,
  PowerStatus,
  WirelessStatus,
  devicesLogDetails,
} from '../model/device';

export const changeAttributeValue = (
  att: DeviceAttribute | devicesLogDetails
): string => {
  if (att.attributeType == '1') {
    if (att.attribute === DeviceAttributeStatus.doorStatus) {
      if (att.attributeValue === '1') return 'Opened';
      return 'Closed';
    }
    if (att.attribute === DeviceAttributeStatus.WaterLeakageStatus) {
      if (att.attributeValue === '1') return 'Leaking';
      return 'Not Leaking';
    }
  }
  return att.attributeValue;
};

export function powerIcon(attributeValue: string): IiconData {
  let value = attributeValue.toLowerCase();
  let icon =
    value === PowerStatus.Off
      ? ['fas', 'toggle-off']
      : value === PowerStatus.On
      ? ['fas', 'toggle-on']
      : [];
  let color =
    value === PowerStatus.Off
      ? 'red'
      : value === PowerStatus.On
      ? 'green'
      : 'white';
  return { icon, color };
}

export function batteryLevel(value: string): IiconData {
  let icon = [];
  let color = '';

  switch (value) {
    case BatteryLevel.High:
      icon = ['fas', 'battery-full'];
      color = 'green';
      break;
    case BatteryLevel.Medium:
      icon = ['fas', 'battery-three-quarters'];
      color = 'yellow';
      break;
    case BatteryLevel.Low:
      icon = ['fas', 'battery-half'];
      color = 'orange';
      break;
    case BatteryLevel.Critical:
      icon = ['fas', 'battery-quarter'];
      color = 'red';
      break;

    default:
      break;
  }
  return { icon, color };
}

export function batteryStatus(value: string): IiconData {
  let icon = [];
  let color = "";

  switch (value.toLowerCase()) {
    case BatteryStatus.GoodBattery:
    case BatteryStatus.VeryGoodBattery:
      icon = ["fas", "battery-full"];
      color = "green";
      break;
    case BatteryStatus.GoodBatteryLor:
      icon = ["fas", "battery-three-quarter"];
      color = "blue";
      break;
    case BatteryStatus.LowBatteryLor:
      icon = ["fas", "battery-quarter"];
      color = "yellow";
      break;
    case BatteryStatus.UltraLowBattery:
      icon = ["fas", "battery-empty"];
      color = "red";
      break;
    case BatteryStatus.LowBattery:
      icon = ["fas", "battery-quarter"];
      color = "red";
      break;

    default:
      break;
  }
  return { icon, color };
}


export function batteryIcon(
  attribute: string,
  value: number | string
): IiconData {
  let iconData: IiconData = { color: '', icon: [] };

  switch (attribute) {
    case BatteryAttribute.BatteryLevel:
      iconData = batteryLevel(value as string);
      break;
    case BatteryAttribute.BatteryStatus:
      iconData = batteryStatus(value as string);
      break;
    case BatteryAttribute.Battery:
      iconData = { icon: ['fas', 'flash-outline'], color: 'yellow' };
      break;
    default:
      break;
  }
  return iconData;
}

export function wirelessIcon(attributeValue: string): IiconData {
  let sigfox = 'assets/sigfox-logo.ico';
  let lora = 'assets/lora.png';
  let nb = 'assets/nb_iot.png';

  let value = attributeValue.toLowerCase();
  // let icon = (value === WirelessStatus.WiFi || value === WirelessStatus.RSSI) ? ['fas', 'wifi'] : [];
  let icon =
    value === WirelessStatus.WiFi
      ? ['fas', 'wifi']
      : value === WirelessStatus.RSSI
      ? ['fas', 'wifi']
      : value === WirelessStatus.SIGFOX
      ? ['', sigfox]
      : value === WirelessStatus.LORA
      ? ['', lora]
      : value === WirelessStatus.NB
      ? ['', nb]
      : [];
  let color = 'blue';
  return { icon, color };
}


export function deviceModeIcon(attributeValue: string): IiconData {
  let icon = [];
  let color = "blue";

  let value = attributeValue.toLowerCase();

  switch (value) {
    case DeviceMode.GPSScanned:
      icon = ["fas", "map-marker-alt"];
      break;
    case DeviceMode.WiFi2Mac:
      icon = ["fas", "wifi"];
      break;
    case DeviceMode.WiFi3Mac:
      icon = ["fas", "wifi"];
      break;
    case DeviceMode.WiFiMac:
      icon = ["fas", "wifi"];
      break;

    default:
      break;
  }
  return { icon, color };
}

export function linkQuality(attributeValue: string): IiconData {
  let icon = [];
  let color = "";

  let value = attributeValue.toUpperCase();

  switch (value.toUpperCase()) {
    case LinkQuality.EXCELLENT:
      icon = ["fas", "signal"];
      color = "green";
      break;
    case LinkQuality.GOOD:
      icon = ["fas", "signal"];
      color = "yellow";
      break;
    case LinkQuality.AVERAGE:
      icon = ["fas", "signal"];
      color = "orange";
      break;
    case LinkQuality.LIMIT:
      icon = ["fas", "signal"];
      color = "red";
      break;

    default:
      break;
  }
  // console.log(value, icon, color);
  return { icon, color };
}

export function doorIcon(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  if (attribute === DoorAttr.doorStatus) {
    icon =
      attributeValue === "0" ? ["fas", "door-closed"] : ["fas", "door-open"];
    color = attributeValue === "0" ? "green" : "red";
  }
  if (attribute === WirelessStatus.RSSI || attribute === WirelessStatus.SNR) {
    icon = ["fas", "wifi"];
    color = "blue";
  }
  return { icon, color };
}

function tempHumidity(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  const checkAtt = attribute.split(" ");
  if (checkAtt[0] === "Humidity") {
    icon = ["", "assets/humidity.svg"];
    color = "blue";
  }
  if (checkAtt[0] === "Temperature") {
    icon = ["fas", "thermometer"];
    color = "blue";
  }
  return { icon, color };
}

function waterLeak(attribute: string, attributeValue: string): IiconData {
  let icon = [];
  let color = "";
  if (attribute === DeviceAttributeStatus.WaterLeakageStatus) {
    if (attributeValue === "1") {
      icon = ["", "assets/water-drop-drop.gif"];
      color = "";
    }
  }
  return { icon, color };
}


export function deviceDashboardIconSet(
  attribute: string,
  attributeValue: string
): IiconData {
  // console.log('att:',attribute,'value:',attributeValue);

  let iconData: IiconData = { color: '', icon: [] };

  iconData = powerIcon(attributeValue);

  // console.log('att:', attribute, 'val:', attributeValue, 'data:', iconData);

  if (!iconData.icon.length) {
    iconData = batteryIcon(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = wirelessIcon(attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = deviceModeIcon(attributeValue);
  }

  if (!iconData.icon.length) {
    // if(attribute.toLowerCase() === 'link quality')
    iconData = linkQuality(attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = doorIcon(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = tempHumidity(attribute, attributeValue);
  }

  if (!iconData.icon.length) {
    iconData = waterLeak(attribute, attributeValue);
  }
  return iconData;
}
