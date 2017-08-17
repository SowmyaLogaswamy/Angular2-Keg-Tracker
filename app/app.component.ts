import { Component } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'app-root',
  template: `
  <div class = "container">
    <div class = "jumbotron">
      <h1>Keg Tracker</h1>
    </div>
    <keg-list [childKegList]="kegs" (clickSenderEdit)="editKeg($event)" (clickSenderSell)="sellPint($event)"></keg-list>
    <hr>
    <edit-keg [childSelectedKeg]="selectedKeg" (doneButtonClickedSender)="finishedEditing()"></edit-keg>
    <hr>
    <new-keg (newKegSender)="addKeg($event)"></new-keg>
  </div>
  `
})

export class AppComponent {

  selectedKeg = null;

  kegs: Keg[] = [
    new Keg("Rachel's Ginger Beer", "Rachel", 6, 6.5),
    new Keg("King Julius Beer", "Roma", 4, 5.5),
    new Keg("Heady Topper Beer", "Budweiser", 4, 7.5),
    new Keg("Dinner Beer", "Samuel", 9, 6.5)
  ];

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  sellPint(clickedKeg) {
    clickedKeg.pints -= 1;
    alert("You sold a pint. You currently have " + clickedKeg.pints + " left.");
  }

  finishedEditing() {
    this.selectedKeg = null;
  }

  addKeg(newKegFromChild: Keg) {
    this.kegs.push(newKegFromChild);
  }


}
