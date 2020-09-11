import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastOptions, ToastaService } from 'ngx-toasta';

import { DialogService } from 'src/app/services/dialog-service';
import { Licence, LicenceList, LicenceSearchParams } from 'src/app/models/licence.model';
import { LicenceService } from 'src/app/services/licence.service';
import { LicenceDetailComponent } from '../licence-detail/licence-detail.component';


@Component({
  selector: 'app-licence-list',
  templateUrl: './licence-list.component.html',
  styleUrls: ['./licence-list.component.scss']
})

export class LicenceListComponent implements OnInit, OnDestroy {
  isLoading = false;
  public entitiesList: LicenceList;

  public dataSource: MatTableDataSource<Licence>;
  public displayedColumns: Array<string> = ['indicatif', 'nom', 'ville', 'actions'];

  // Pagination
  public totalCount = 0;
  public pageSize = 15;
  public pageIndex = 0;
  public pageSizeOptions: number[] = [5, 15, 25, 50, 100, 250];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  toastOptions: ToastOptions = {
    title: 'Licence',
    showClose: true,
    timeout: 15000,
  };

  public searchParams: LicenceSearchParams = {} as LicenceSearchParams;

  public form: FormGroup;

  private valueChangesSubscription: Subscription;
  private subscriptions: Subscription[] = [];

  constructor(private dialog: MatDialog, private dialogService: DialogService,
              private toastService: ToastaService,
              private service: LicenceService) {
  }

  ngOnInit(): void {
    this.loadentitiesList(this.searchParams);
    this.form = new FormGroup({
      nomFilter: new FormControl(),
      villeFilter: new FormControl(),
      indicatifFilter: new FormControl(),
    });

    this.valueChangesSubscription = this.form.valueChanges.subscribe(changes => {
      this.searchParams.nom = changes.nomFilter !== null ? changes.nomFilter : '';
      this.searchParams.ville = changes.villeFilter !== null ? changes.villeFilter : '';
      this.searchParams.indicatif = changes.indicatifFilter !== null ? changes.indicatifFilter : '';
      this.loadentitiesList(this.searchParams);
    });
  }

  private loadentitiesList(searchParams: LicenceSearchParams): void {
    this.isLoading = true;
    this.searchParams.sortOrder = 'asc';
    this.searchParams.pageIndex = this.pageIndex;
    this.searchParams.pageSize = this.pageSize;

    this.subscriptions.push(this.service.search(searchParams)
      .subscribe(data => {
        this.isLoading = false;
        this.entitiesList = data;
        this.dataSource = new MatTableDataSource<Licence>(this.entitiesList.items);
        this.dataSource.sort = this.sort;
        this.totalCount = this.entitiesList.totalCount;
        this.toastOptions.msg = 'Liste des radioamateurs chargée';
        this.toastService.success(this.toastOptions);
      },
      error => {
        this.isLoading = false;
        this.toastOptions.msg = 'Erreur lors du chargement de la liste des radioamateurs ' + ' ' + error.statusText;
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
    const dialogRef = this.dialog.open(LicenceDetailComponent, dialogConfig);
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
