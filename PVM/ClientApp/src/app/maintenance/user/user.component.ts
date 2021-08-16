import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { State, SortDescriptor, process, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { FormModalService } from '../../home/form-modal/form-modal.service';
import { MaintenanceService } from '../maintenance.service';
import { UtilitiesService } from '../../shared/service/utilities.service';
import { AddUserComponent } from './add-user/add-user.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomConfirmModalComponent } from '../../shared/modal/confirm/confirm.component';
import { Router } from '@angular/router';
import { DataSharedService } from '../../shared/service/data.service';
const matches = (el: any, selector: any) => (el.matches || el.msMatchesSelector).call(el, selector);
const MODAL = {
  AddUser: AddUserComponent,
  DelUser: CustomConfirmModalComponent
}
  

@Component({
  selector: 'app-maitenance-user',
  templateUrl: './user.component.html',
  styleUrls: ['../maintenance.component.css']
})
export class UserComponent implements OnInit {
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

  constructor(private toastr: NotificationService, private formModalService: FormModalService,
    private service: MaintenanceService, private util: UtilitiesService,
    private modal: NgbModal) {
    
  }

  

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    var sub = this.service.GetUser().subscribe(data => {
      var util = this.util;
      this.data = data;
      _.forEach(this.data, function (d) {
        d.date_updated = util.FormatDate(d.date_updated);
        return d;
      })

      sub.unsubscribe();
    })
  }
  AddUser(action: string, data: any) {

    const modalRef = this.modal.open(MODAL["AddUser"], {
      backdrop: 'static', keyboard: false
    });
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.data = data;
    modalRef.result.then(($e) => {
      if ($e === 'save') {
        this.loadUserData();
      }
    })
  }
  DelUser(id: number) {
    const modalRef = this.modal.open(MODAL["DelUser"], {
      backdrop: 'static', keyboard: false
    });
    modalRef.result.then(($e) => {
      if ($e === 'save') {
        this.service.DelUser(id).subscribe(data => {
          this.loadUserData();
          this.toastr.showSuccess("Record deleted successfully.");
        })
        
      }
    })
  }
  EditUser(action: string, id: number) {
    var filterUser = _.filter(this.data, { 'lib_user_level_id': id });
    this.AddUser(action, filterUser[0]);
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
