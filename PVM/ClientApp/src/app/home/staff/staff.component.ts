import { Component, HostListener, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { State, SortDescriptor, process, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { StaffService } from './staff.service';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ConfirmModalComponent } from 'src/app/shared/modal/confirmation/confirm.modal.component';
import { CustomDeleteConfirmModalComponent } from 'src/app/shared/modal/deleteConfirm/deleteConfirm.component';
import { DataSharedService } from 'src/app/shared/service/data.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { UtilitiesService } from '../../shared/service/utilities.service';

const MODALS = {
  formModal: FormModalComponent,
  confirmModal: CustomDeleteConfirmModalComponent
};
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnChanges {
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
  constructor(private staffService: StaffService,
    private modalService: NgbModal, private dataService: DataSharedService,
    private toastr: NotificationService, private util: UtilitiesService) {

  }

  loadPost(staffType: string) {

    var subs = this.staffService.GetPost(staffType).subscribe((data : {}) =>  {
      //this.data.push(data);
      this.data = data;
      var util = this.util;
      _.forEach(this.data, function (d) {
        d.vacant_since = util.FormatDate(d.vacant_since) === "Invalid Date" || d.vacant_since === "" || d.vacant_since === null ? "" : util.FormatDate(d.vacant_since);
        d.date_updated = util.FormatDate(d.date_updated) === "Invalid Date" || d.date_updated === "" || d.date_updated === null ? "" : util.FormatDate(d.date_updated);
      })
      subs.unsubscribe();
    })

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.StaffType.currentValue !== "") {
      this.staffType = changes.StaffType.currentValue;
      this.loadPost(changes.StaffType.currentValue);
    }
  }
  @HostListener('window:resize', ["$event"])
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop);
    if (pos >= 30) {
      this.scrollTop = true;
    } else if (pos < 30) {
      this.scrollTop = false;
    }
  }

  AddPost(data: any, action: string) {
    const modalRef = this.modalService.open(MODALS['formModal'], {
      backdrop: 'static', keyboard: false,
      windowClass: 'addPost'});
    modalRef.componentInstance.staff_type = this.staffType;
    modalRef.componentInstance.postData = data;
    modalRef.componentInstance.action = action;
    modalRef.result.then(($e) => {
      this.loadPost(this.staffType);
      this.dataService.getPostId(0);
      this.dataService.GetPostData({action: ''});
      //this.dataService.GetNewPostData([]);
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
  AddForms() {

  }
  edit(id: number) {

    var data = _.cloneDeep(this.data);
    data = _.filter(this.data, { post_id: id });
    this.AddPost(data, 'U');
  }
  copy(id: number) {

    var data = _.cloneDeep(this.data);
    data = _.filter(this.data, { post_id: id });
    data[0].post_id = 0;
    this.AddPost(data, 'I');
  }
  delete(id: number) {
    const modalRef = this.modalService.open(MODALS['confirmModal'], { backdrop: 'static', keyboard: false });
    modalRef.componentInstance.postData = this.data;
    modalRef.result.then(($e) => {
      if ($e === "save") {
        var sub = this.staffService.DeletePost(id).subscribe(data => {
          this.loadPost(this.staffType);
          this.toastr.showSuccess("Record Saved.");
          sub.unsubscribe();
        })
      }
    })
  }

}
