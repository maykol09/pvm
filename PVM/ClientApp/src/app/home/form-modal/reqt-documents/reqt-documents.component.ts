import { Component, OnInit, Input, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { State, SortDescriptor, process, orderBy } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { ReferenceService } from 'src/app/shared/service/reference.service';
import { FormModalService } from '../form-modal.service';
import { AddEvent, EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { groupBy, GroupDescriptor } from '@progress/kendo-data-query';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { DataSharedService } from 'src/app/shared/service/data.service';

const matches = (el: any, selector: any) => (el.matches || el.msMatchesSelector).call(el, selector);

@Component({
  selector: 'app-reqt-documents',
  templateUrl: './reqt-documents.component.html',
  styleUrls: ['../form-modal.component.css']
})
export class ReqtDocumentsComponent implements OnInit {
  @Input() staff_type: string = "";
  @Input() postData: any[] = [];
  @Input() action: string = "";

  public actionGridData_: any[] = [];
  public state: State = {
    skip: 0,
    take: 20,
    filter: {
      logic: 'and',
      filters: []
    }
  };
  public reqtData: any = [];
  public actionGridData: GridDataResult = process(this.reqtData, this.state);
  //public filter: CompositeFilterDescriptor = [];
  public multiple = true;
  public allowUnsort = true;
  public showFilter = false;
  public context: string = "";
  public sort: SortDescriptor[] = [{ field: 'Created', dir: 'desc' }];
  public skip = 0;
  public pageSize = 20;
  public filterValues = [];

  @ViewChild(GridComponent)
  private grid: GridComponent;

  public view: any[];

  public formGroup: any;

  private editedRowIndex: any = 0;
  private docClickSubscription: any;
  private isNew: boolean;
  public reqt_documentsList: any = [];
  public post_id: number = 0;
  //public stepList: any[];

  constructor(private refService: ReferenceService, private service: FormModalService,
    private renderer: Renderer2, private util: UtilitiesService,
    private toastr: NotificationService, private dataService: DataSharedService) { }

  ngOnInit(): void {
    this.LoadReqtDocuments();
    var sub = this.service.GetReqtDocumentsRef().subscribe((data: {}) => {

      this.reqt_documentsList = _.filter(data, ['staff_type', this.staff_type]);
    })
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    this.docClickSubscription();
  }
  reqtChanged(event: any) {
    //var data = _.filter(this.action_stepList, ['action_step', event]);
    this.dataService.hasPostId.subscribe(post_id => {
      var postData = this.postData === undefined || this.postData.length === 0 ? post_id : this.postData[0].post_id
      this.formGroup.patchValue({
        reqt_id: event.reqt_id,
        post_id: postData
      })
    })
  }

  public addHandler(): void {
    this.closeEditor();

    this.formGroup = this.service.FormGroupReqt();
    this.isNew = true;
    this.grid.addRow(this.formGroup);

  }

  public saveRow() {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }

  public cellClickHandler(event: any): void {
    if (event.isEdited || (this.formGroup && !this.formGroup.valid)) {
      return;
    }

    if (this.isNew) {
      event.rowIndex += 1;
    }

    this.saveCurrent();
    this.formGroup = this.service.FormGroupReqt();
    this.formGroup.patchValue(event.dataItem);
    this.editedRowIndex = event.rowIndex;
    this.grid.editRow(event.rowIndex, this.formGroup);
  }

  public cancelHandler(): void {

    this.closeEditor();

  }
  private closeEditor(): void {
    this.grid.closeRow(this.editedRowIndex);
    this.isNew = false;
    this.editedRowIndex = undefined;
    this.formGroup = undefined;

  }

  private onDocumentClick(e: any): void {
    if (!this.isNew && this.formGroup && this.formGroup.valid && !matches(e.target, '#reqtDocumentsGrid tbody *, #reqtDocumentsGrid .k-grid-toolbar .k-button')) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup) {
      this.formGroup.value.action = this.isNew ? 'I' : 'U';
      var date = new Date(this.formGroup.value.reqt_date);
      this.formGroup.value.reqt_date = new Date(date.setDate(date.getDate() + 1));
      this.formGroup.value.post_id = this.post_id;
      this.service.SaveReqtDocuments(this.formGroup.value).subscribe(data => {
        this.LoadReqtDocuments();
        this.toastr.showSuccess("Record Saved.")
        this.closeEditor();
      });
    }
  }

  LoadReqtDocuments() {
    var formatDate = this.util;
    this.dataService.hasPostId.subscribe(post_id => {
      var postData = this.postData === undefined || this.postData.length === 0 || this.postData[0].post_id === 0 ? post_id : this.postData[0].post_id;
      this.post_id = postData;
      
      this.service.GetReqtDocuments(postData).subscribe((data: {}) => {
        _.forEach(data, function (d: any) {
          return d.reqt_date = new Date(formatDate.FormatDate(d.reqt_date));
        });
        this.reqtData = data;
      })
    });
  }
  private loadPages(): void {
    this.actionGridData = {
      data: this.reqtData.slice(this.skip, this.skip + this.pageSize),
      total: this.reqtData.length
    };
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = isNaN(event.take) ? this.reqtData.length : event.take;
    this.loadPages();
  }
  formatDate(myStringDate: string) {
    return new Date(parseInt(myStringDate.substr(6)));
  }
  public filterChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.actionGridData = process(this.reqtData, this.state);
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.actionGridData = {
      data: orderBy(this.reqtData, this.sort),
      total: this.reqtData.length
    };
  }
  public showHideFilter() {
    this.showFilter = this.showFilter ? false : true;
  }
}
