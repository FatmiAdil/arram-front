import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { ToastOptions, ToastaService } from 'ngx-toasta';
import { Subscription } from 'rxjs';
import * as L from 'leaflet';

import { RelaisService } from 'src/app/services/relais.service';
import { DialogService } from 'src/app/services/dialog-service';
import { Relais, RelaisList, RelaisSearchParams } from 'src/app/models/relais.model';
import { RelaisDetailComponent } from '../relais-detail/relais-detail.component';
import { environment } from 'src/environments/environment';
import { PopUpService } from 'src/app/services/pop-up.service';

let arrammap = null;
@Component({
  selector: 'app-relais-list',
  templateUrl: './relais-list.component.html',
  styleUrls: ['./relais-list.component.scss']
})
export class RelaisListComponent implements OnInit, OnDestroy {

  isLoading = false;
  public entitiesList: RelaisList;
  public bandes: Array<{ id: number, libelle: string }> = Array(
    { id: 1, libelle: 'VHF' },
    { id: 2, libelle: 'UHF' }
  );

  public dataSource: MatTableDataSource<Relais>;
  public displayedColumns: Array<string> = ['region', 'site', 'nom', 'strbande', 'freqEntree', 'freqSortie', 'actions'];

  // Pagination
  public totalCount = 0;
  public pageSize = 15;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 15, 25, 50, 100, 250];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  toastOptions: ToastOptions = {
    title: 'Relais',
    showClose: true,
    timeout: 15000,
  };

  public searchParams: RelaisSearchParams = {} as RelaisSearchParams;

  public form: FormGroup;

  private valueChangesSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private dialogService: DialogService,
              private toastService: ToastaService,
              private popupService: PopUpService,
              private service: RelaisService) {
  }

  ngOnInit(): void {
    arrammap = L.map('arrammap').setView([environment.latitude, environment.longitude], 12);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Arram'
    }).addTo(arrammap);

    this.loadentitiesList(this.searchParams);
    this.form = new FormGroup({
      regionFilter: new FormControl(),
      bandeFilter: new FormControl(),
    });

    this.valueChangesSubscription = this.form.valueChanges.subscribe(changes => {
      this.searchParams.region = changes.regionFilter !== null ? changes.regionFilter : '';
      this.searchParams.bande = changes.bandeFilter !== null ? changes.bandeFilter : '';
      this.loadentitiesList(this.searchParams);
    });
  }

  private loadentitiesList(searchParams: RelaisSearchParams): void {
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.isLoading = true;
    this.searchParams.sortOrder = 'asc';
    this.searchParams.pageIndex = this.pageIndex;
    this.searchParams.pageSize = this.pageSize;

    this.subscriptions.push(this.service.search(searchParams)
      .subscribe(data => {
        this.isLoading = false;
        if (data.totalCount > 0) {
          for (let i = 0; i < data.totalCount; i++) {
            L.marker([data.items[i].latitude, data.items[i].longitude], {icon: myIcon})
            .bindPopup(this.popupService.makeCapitalPopup(data.items[i]))
            .addTo(arrammap);
          }
        }
        this.entitiesList = data;
        this.dataSource = new MatTableDataSource<Relais>(this.entitiesList.items);
        this.dataSource.sort = this.sort;
        this.totalCount = this.entitiesList.totalCount;
        this.toastOptions.msg = 'Liste des relais chargée';
        this.toastService.success(this.toastOptions);
      },
      error => {
        this.isLoading = false;
        this.toastOptions.msg = 'Erreur lors du chargement de la liste des relais ' + ' ' + error.statusText;
        this.toastService.error(this.toastOptions);
      }
      ));
  }

  public onPaginationChange(event) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadentitiesList(this.searchParams);
  }

  addOrEdit(index, id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '75%';
    dialogConfig.height = '100%';
    dialogConfig.data = {index, id};
    const dialogRef = this.dialog.open(RelaisDetailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        switch (data.id) {
          case id: {
            const indice = this.findIndexofEntity(data.id);
            this.entitiesList.items[indice] = data;
            break;
          }
          case 0: {
             break;
          }
          default: {
            this.dataSource.data.push(data);
            this.dataSource.filter = '';
            this.totalCount ++;
            break;
          }
        }
      }
    );
  }

  updateTableEntities() {
    this.dataSource.data = this.entitiesList.items;
  }

  findIndexofEntity(id: number): number {
    const index = this.entitiesList.items.findIndex(t => t.id === id);
    return index;
  }

  delete(id: number, row: any) {
    this.dialogService.openConfirmDialog('Voulez-vous supprimer cet item ?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.subscriptions.push(this.service.delete(id).subscribe(data => {
          if (data) {
            this.toastService.success('Item supprimé');
            // update datatable
            const indice = this.dataSource.data.indexOf(row);
            this.dataSource.data.splice(indice, 1);
            this.dataSource._updateChangeSubscription();
            this.totalCount --;
          } else {
            this.toastService.error('Erreur lors de la suppression de cet item');
          }
        }));

      }
    });
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
