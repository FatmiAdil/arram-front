import { Component, OnInit } from '@angular/core';

import { ToastaService, ToastOptions } from 'ngx-toasta';

@Component({
  selector: 'app-relais-detail',
  templateUrl: './relais-detail.component.html',
  styleUrls: ['./relais-detail.component.scss']
})
export class RelaisDetailComponent implements OnInit {
  toastOptions: ToastOptions = {
    title: 'Carte',
    showClose: true,
    timeout: 5000,
  };

  constructor(private toastService: ToastaService) { }

  ngOnInit() {
  }

}
