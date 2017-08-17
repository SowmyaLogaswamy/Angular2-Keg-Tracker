import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <ul>
    <li [class]="priceColor(currentKeg)" *ngFor="let currentKeg of childKegList">
      <ul>
        <li><strong>Name:</strong> {{currentKeg.name}}</li>
        <li><strong>Brand:</strong> {{currentKeg.brand}}</li>
        <li><strong>Price:</strong> {{currentKeg.price}}</li>
        <li><strong>Alcohol Content:</strong> {{currentKeg.alcoholContent}}</li>
        <li><strong>Pints:</strong> {{currentKeg.pints}}</li>
      </ul>
      <div class="alert alert-danger" *ngIf="childSelectedKeg">
        <strong>Danger!</strong> Keg is critically low.
      </div>
      <button (click)="editButtonHasBeenClicked(currentKeg)">Edit!</button>
      <button (click)="sellButtonHasBeenClicked(currentKeg)">Sell!</button>
    </li>
  </ul>
  `
})


export class KegListComponent {
  @Input() childKegList: Keg[];
  @Output() clickSenderEdit = new EventEmitter();
  @Output() clickSenderSell = new EventEmitter();



  priceColor(currentKeg){
    if (currentKeg.price >= 5){
      return "list-group-item-success";
    } else {
      return "list-group-item-info";
    }
  }

  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSenderEdit.emit(kegToEdit);
  }

  sellButtonHasBeenClicked(kegToEdit: Keg) {
      this.clickSenderSell.emit(kegToEdit);
  }



}
