import { Component, OnInit, Input } from '@angular/core';
import { ExecOptionsWithStringEncoding } from 'child_process';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss'],
})
export class DeviceListComponent implements OnInit {
  @Input() tag: string
  @Input() deviceName: string
  @Input() deviceTime:string
  @Input() status:string

  @Input() deviceDescription:string

  constructor() { }

  ngOnInit() {}

}
