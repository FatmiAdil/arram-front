import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {

    let retour =  `<div class='popup'`;
    retour += `<div >Relais: ${ data.relais.nom }</div>`;
    retour +=  `<div>Vitesse: ${ data.relais.freqEntree }</div>`;
    retour +=  `</div>`;

    return retour;
  }
}
