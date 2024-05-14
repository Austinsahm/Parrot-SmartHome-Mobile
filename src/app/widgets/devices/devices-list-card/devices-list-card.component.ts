import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-devices-list-card',
  templateUrl: './devices-list-card.component.html',
  styleUrls: ['./devices-list-card.component.scss'],
})
export class DevicesListCardComponent implements OnInit {
  @Input() tag: string
  @Input() deviceName: string
  @Input() deviceTime:string
  @Input() status:string

  @Input() deviceDate:string

  colors = ['#BEE8EB', '#EEF8B4', '#CDEDB4', '#EEF8B4', '#CDEDB4'];

  getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  constructor() { }

  ngOnInit() {}

}
