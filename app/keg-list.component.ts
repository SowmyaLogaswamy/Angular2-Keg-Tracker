import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <ul>
    <li [class]="priceColor(currentKeg)" *ngFor="let currentKeg of childKegList">
      <ul>
        <li>{{currentKeg.name}}</li>
        <li>{{currentKeg.brand}}</li>
        <li>{{currentKeg.price}}</li>
        <li>{{currentKeg.alcoholContent}}</li>
      </ul>
      <button (click)="editButtonHasBeenClicked(currentKeg)">Edit!</button>
    </li>
  </ul>
  `
})


export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSender = new EventEmitter();



  priceColor(currentKeg){
    if (currentKeg.price >= 5){
      return "list-group-item-danger";
    } else {
      return "list-group-item-info";
    }
  }

  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSender.emit(kegToEdit);
  }


}
