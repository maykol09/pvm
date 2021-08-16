import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { State, SortDescriptor, process, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { FormModalService } from '../../home/form-modal/form-modal.service';
import { MaintenanceService } from '../maintenance.service';
import { AddReferenceComponent } from './add-reference/add-reference.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomConfirmModalComponent } from '../../shared/modal/confirm/confirm.component';
import { ReferenceService } from '../../shared/service/reference.service';
const MODAL = {
  addRef: AddReferenceComponent,
  DelRef: CustomConfirmModalComponent
}

@Component({
  selector: 'app-maitenance-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['../maintenance.component.css']
})
export class ReferenceComponent implements OnInit {
  public gridData_: any[] = [];
  public state: State = {
    skip: 0,
    take: 20,
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public data: any = [];
  public gridData: GridDataResult = process(this.data, this.state);
  //public filter: CompositeFilterDescriptor = [];
  public multiple = true;
  public allowUnsort = true;
  public showFilter = false;
  public context: string = "";
  public sort: SortDescriptor[] = [{ field: 'Created', dir: 'desc' }];
  public skip = 0;
  public pageSize = 20;
  public filterValues = [];

  scrollTop: boolean = false;
  hideForMobile = false;
  @Input() StaffType: string = '';
  staffType: string = '';

  public action_stepList: any = [];
  public post_id: number = 0;
  constructor(private toastr: NotificationService, private formModalService: FormModalService, private service: MaintenanceService, private modal: NgbModal, private refService: ReferenceService) { }

  ngOnInit(): void {
    this.loadReference();
  }
  loadReference() {
    var sub = this.formModalService.GetActionHistoryRef().subscribe(data => {
      this.data = data;
      this.refService.GetRef(this.data);
      sub.unsubscribe();
    })
  }
  AddRef(action: string, data: any) {
    const modalRef = this.modal.open(MODAL["addRef"], {
      backdrop: 'static', keyboard: false
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.result.then(($e) => {
      if ($e === 'save') {
        this.loadReference();
      }
    })
  }
  EditRef(action: string, id: number) {
    var filterRef = _.filter(this.data, { 'action_id': id });
    this.AddRef(action, filterRef[0]);
  }
  DelRef(id: number) {
    const modalRef = this.modal.open(MODAL["DelRef"], {
      backdrop: 'static', keyboard: false
    });
    modalRef.result.then(($e) => {
      if ($e === 'save') {
        this.service.DelRef(id).subscribe(data => {
          this.loadReference();
          this.toastr.showSuccess("Record deleted successfully.");
        })

      }
    })
  }
  private loadPages(): void {
    this.gridData = {
      data: this.data.slice(this.skip, this.skip + this.pageSize),
      total: this.data.length
    };
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = isNaN(event.take) ? this.data.length : event.take;
    this.loadPages();
  }
  formatDate(myStringDate: string) {
    return new Date(parseInt(myStringDate.substr(6)));
  }
  public filterChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridData = process(this.data, this.state);
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.gridData = {
      data: orderBy(this.data, this.sort),
      total: this.data.length
    };
  }
  public showHideFilter() {
    this.showFilter = this.showFilter ? false : true;
  }
}
