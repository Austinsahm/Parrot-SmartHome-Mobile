import { Component, OnInit, Input } from '@angular/core';
import { ComboBoxOption } from '../../types';

@Component({
  selector: 'app-combo-select-field',
  templateUrl: './combo-select-field.component.html',
  styleUrls: ['./combo-select-field.component.scss'],
})
export class ComboSelectFieldComponent<T> implements OnInit {
  @Input() options: Array<ComboBoxOption<T>> = [];

  constructor() { }

  ngOnInit() {}

  trackByFn(index: number, option: ComboBoxOption<T>): string {
    return option.key;
  }

}
