import { Component, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template: `
    <div class="panel panel-info">
      <div class="panel-heading">
        <h1>New Keg</h1>
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label class="control-label col-sm-2">Enter Keg Name:</label>
          <div class="col-sm-10">
            <input class="form-control" #newName>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2">Enter Keg Brand:</label>
          <div class="col-sm-10">
            <input class="form-control" #newBrand>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2">Enter Keg Price:</label>
          <div class="col-sm-4">
            <input class="form-control" #newPrice>
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-2">Enter Keg Alcohol Content:</label>
          <div class="col-sm-4">
            <input class="form-control" #newAlcoholContent>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button class="btn btn-danger"(click)= "submitForm(newName.value, newBrand.value, newPrice.value, newAlcoholContent.value); newName.value=''; newBrand.value=''; newPrice.value='';newAlcoholContent.value='';">Add</button>
          </div>
        </div>
      </div>
    </div>
  `
})

export class NewKegComponent {
  @Output() newKegSender = new EventEmitter();
  submitForm(name: string, brand: string, price: number, alcoholContent: number) {
    var newKegToAdd: Keg = new Keg(name, brand, price, alcoholContent);
    this.newKegSender.emit(newKegToAdd);
  }
}
