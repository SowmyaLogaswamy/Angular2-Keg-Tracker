import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template: `
    <div *ngIf="childSelectedKeg">
      <div class="panel panel-warning">
        <div class="panel-heading">
          <h4>Edit Keg -- {{childSelectedKeg.name}}</h4>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <label class="control-label col-sm-2">Enter Keg Name:</label>
            <div class="col-sm-10">
              <input class="form-control" [(ngModel)]="childSelectedKeg.name">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Enter Keg Brand:</label>
            <div class="col-sm-10">
              <input  class="form-control" [(ngModel)]="childSelectedKeg.brand">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Enter Keg Style:</label>
            <div class="col-sm-10">
              <input  class="form-control" [(ngModel)]="childSelectedKeg.style">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Enter Keg Price:</label>
            <div class="col-sm-4">
              <input  class="form-control" [(ngModel)]="childSelectedKeg.price">
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-2">Enter Keg Alcohol Content:</label>
            <div class="col-sm-4">
              <input  class="form-control" [(ngModel)]="childSelectedKeg.alcoholContent">
            </div>
          </div>
          <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-danger" (click) = "doneButtonClicked()">Done</button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class EditKegComponent {
  @Input() childSelectedKeg: Keg;
  @Output() doneButtonClickedSender = new EventEmitter();


  doneButtonClicked() {
     this.doneButtonClickedSender.emit();
   }
}
