import { Component, Inject, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { ToastOptions, ToastaService } from 'ngx-toasta';

import { Licence } from 'src/app/models/Licence.model';

import { LicenceService } from 'src/app/services/licence.service';
import { Photo } from 'src/app/models/photo.model';
import { environment } from 'src/environments/environment';


@Component(
  {
    selector: 'app-detail-licence',
    templateUrl: './licence-detail.component.html',
    styleUrls: ['./licence-detail.component.scss']
    , encapsulation: ViewEncapsulation.None
  }
)
export class LicenceDetailComponent implements OnInit, OnDestroy {

  isLoading = false;
  submitted = false;
  rootUrlPhoto = environment.urlPhoto;
  entite: Licence;
  public photos: Photo[];

  toastOptions: ToastOptions = {
    title: 'Licence',
    showClose: true,
    timeout: 5000,
  };
  private subscriptions: Subscription[] = [];

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<LicenceDetailComponent>,
              private toastService: ToastaService,
              private service: LicenceService) {
  }

  ngOnInit(): void {
    this.createForm();

    if (this.data.id !== null) {
      this.getEntity(this.data.id);
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      indicatif: ['', [Validators.required]],
      nom: [''],
      prenom: [''],
      adresse1: [''],
      adresse2: [''],
      codePostal: [''],
      ville: [''],
      email: ['', [Validators.email]],
      webSite: ['', ],
      qraLocator: [''],
      anneeLicence: [''],
      dateCreation: [''],
      dateModification: [''],
      isDeleted: [''],
      suppressorId: ['']
    },
    // {
    //   updateOn: 'blur'
    // }
    );
  }

  updateForm() {
    this.form.patchValue({
      id: this.entite.id,
      indicatif: this.entite.indicatif,
      nom: this.entite.nom,
      prenom: this.entite.prenom,
      adresse1: this.entite.adresse1,
      adresse2: this.entite.adresse2,
      codePostal: this.entite.codePostal,
      ville: this.entite.ville,
      email: this.entite.email,
      website: this.entite.webSite,
      qraLocator: this.entite.qraLocator,
      anneeLicence: this.entite.anneeLicence,
      dateCreation: this.entite.dateCreation,
      dateModification: this.entite.dateModification,
      isDeleted: this.entite.isDeleted,
      suppressorId: this.entite.suppressorId
    });
  }

  get f() { return this.form.controls; }

  getEntity(id: string) {
    this.subscriptions.push(this.service.get(id).subscribe(
      data => {
        this.entite = data;
        this.toastOptions.msg = 'Radioamateur chargé';
        this.toastService.success(this.toastOptions);
        this.updateForm();
        this.photos = this.entite.photos;
      },
      error => {
        this.isLoading = false;
        this.toastOptions.msg = 'Erreur de chargement des détails du radioamateur' + ' ' + error.statusText;
        this.toastService.error(this.toastOptions);
      }
    ));
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    } else {
      this.isLoading = true;
      this.entite = Object.assign({}, this.form.value);
      this.entite.isDeleted = false;


      if (this.form.value.id  === null || this.form.value.id === '') {
        this.subscriptions.push(this.service.create(this.entite).subscribe(res => {
          this.isLoading = false;
          this.dialogRef.close(res);
          this.toastOptions.msg = 'Radioamateur créé';
          this.toastService.success(this.toastOptions);
        },
        error => {
          this.isLoading = false;
          this.toastOptions.msg = 'Erreur lors de la création du radioamateur' + ' ' + error.statusText;
          this.toastService.error(this.toastOptions);
        })
        );
      } else {
      this.entite.dateModification = new Date();
      this.subscriptions.push(this.service.update(this.entite).subscribe(res => {
            this.isLoading = false;
            this.toastOptions.msg = 'Radioamateur mis à jour';
            this.toastService.success(this.toastOptions);
            this.dialogRef.close(res);
          },
          error => {
            this.isLoading = false;
            this.toastOptions.msg = 'Erreur lors de la mise à jour de la licence' + ' ' + error.statusText;
            this.toastService.error(this.toastOptions);
          })
        );
      }
    }
  }

  close() {
    const data = {id : 0 };
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

