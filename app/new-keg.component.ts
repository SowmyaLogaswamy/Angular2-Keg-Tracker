import { Component, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template: `
    <h1>New Keg</h1>
    <label>Enter Keg Name:</label>
    <input #newName>
    <label>Enter Keg Brand:</label>
    <input #newBrand>
    <label>Enter Keg Price:</label>
    <input #newPrice>
    <label>Enter Keg Alcohol Content:</label>
    <input #newAlcoholContent>
    <button (click)= "submitForm(newName.value, newBrand.value, newPrice.value, newAlcoholContent.value); newName.value=''; newBrand.value=''; newPrice.value='';newAlcoholContent.value='';">Add</button>
  `
})

export class NewKegComponent {
  @Output() newKegSender = new EventEmitter();
  submitForm(name: string, brand: string, price: number, alcoholContent: number) {
    var newKegToAdd: Keg = new Keg(name, brand, price, alcoholContent);
    this.newKegSender.emit(newKegToAdd);
  }
}
