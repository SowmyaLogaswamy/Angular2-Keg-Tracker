import {Pipe, PipeTransform} from '@angular/core';
import {Keg} from './keg.model';

@Pipe({
  name: "styleness",
  pure: false
})


export class StylenessPipe implements PipeTransform {
  transform(input: Keg[], desiredStyleness) {
    var output: Keg[] = [];
    if(desiredStyleness === "ipaKegs") {
      for (var i = 0; i < input.length; i++) {
        if (input[i].style === "IPA") {
          output.push(input[i]);
        }
      }
      return output;
    } else if (desiredStyleness === "paleAleKegs") {
      for(var i=0; i<input.length; i++) {
        if(input[i].style === "Pale Ale") {
          output.push(input[i]);
        }
      }
      return output;
    } else {
      return input;
    }
  }
}
