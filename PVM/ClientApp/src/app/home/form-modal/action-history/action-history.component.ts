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
  selector: 'app-action-history',
  templateUrl: './action-history.component.html',
  styleUrls: ['../form-modal.component.css']
})
export class ActionHistoryComponent implements OnInit, OnDestroy {
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
  public actionData: any = [];
  public actionGridData: GridDataResult = process(this.actionData, this.state);
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
  public action_stepList: any = [];
  public post_id: number = 0;
  //public stepList: any[];

  constructor(private refService: ReferenceService, private service: FormModalService,
    private renderer: Renderer2, private util: UtilitiesService,
    private toastr: NotificationService, private dataService: DataSharedService) { }

  ngOnInit(): void {
    this.LoadActionHistory();
    this.refService.ref.subscribe(data => {
      var sub = this.service.GetActionHistoryRef().subscribe(data => {

        this.action_stepList = _.filter(data, { 'is_active': true, 'staff_type': this.staff_type, });
        sub.unsubscribe();
      })

    })
    
    this.docClickSubscription = this.renderer.listen('document', 'click', this.onDocumentClick.bind(this));
  }

  ngOnDestroy() {
    this.docClickSubscription();
  }
  actionStepChanged(event: any) {
    //var data = _.filter(this.action_stepList, ['action_step', event]);
    this.dataService.hasPostId.subscribe(post_id => {
      var postData = this.postData === undefined || this.postData.length === 0 ? post_id : this.postData[0].post_id
      this.formGroup.patchValue({
        action_stage: event.action_stage,
        next_step: event.next_step,
        action_id: event.action_id,
        for_per_only: event.for_per_only,
        post_id: postData
      })
    })
  }
  public addHandler(): void {
    this.closeEditor();

    this.formGroup = this.service.FormGroupAction();
    this.isNew = true;
    this.grid.addRow(this.formGroup);

  }

  public saveRow() {
    if (this.formGroup && this.formGroup.valid) {
      this.saveCurrent();
    }
  }

  public cellClickHandler(event: any): void {
    if (!this.isReadOnly(event.field) && event.isEdited || (this.formGroup && !this.formGroup.valid)) {
      event.sender.editCell(event.rowIndex, event.columnIndex, this.formGroup.patchValue(event.dataItem));
      return;
    }

    if (this.isNew) {
      event.rowIndex += 1;
    }

    this.saveCurrent();
    this.formGroup = this.service.FormGroupAction();
    this.formGroup.patchValue(event.dataItem);
    this.editedRowIndex = event.rowIndex;
    this.grid.editRow(event.rowIndex, this.formGroup);
  }
  private isReadOnly(field: string): boolean {
    const readOnlyColumns = ['action_stage', 'next_step', 'for_per_only'];
    return readOnlyColumns.indexOf(field) > -1;
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
    if (!this.isNew && this.formGroup && this.formGroup.valid && !matches(e.target, '#actionHistoryGrid tbody *, #actionHistoryGrid .k-grid-toolbar .k-button')) {
      this.saveCurrent();
    }
  }

  private saveCurrent(): void {
    if (this.formGroup && this.formGroup.dirty) {
      this.formGroup.value.action = this.isNew ? 'I' : 'U';
      var date = new Date(this.formGroup.value.action_date);
      this.formGroup.value.action_date = new Date(date.setDate(date.getDate() + 1));
      this.formGroup.value.post_id = this.post_id;

      this.service.SaveActionHistory(this.formGroup.value).subscribe(data => {
        //this.actionData.push(this.formGroup.value);
        this.LoadActionHistory();
        this.toastr.showSuccess("Record Saved.")

      });
      this.closeEditor();
    } else {
      this.closeEditor();
    }
  }


  LoadActionHistory() {
    var formatDate = this.util;
    this.dataService.hasPostId.subscribe(post_id => {
      var postData = this.postData === undefined || this.postData.length === 0 || this.postData[0].post_id === 0 ? post_id : this.postData[0].post_id;
      this.post_id = postData;
      this.service.GetActionHistory(postData).subscribe((data: {}) => {
        _.forEach(data, function (d: any) {
          return d.action_date = new Date(formatDate.FormatDate(d.action_date));
        });
        this.actionData = data;
      })
    })

  }


  private loadPages(): void {
    this.actionGridData = {
      data: this.actionData.slice(this.skip, this.skip + this.pageSize),
      total: this.actionData.length
    };
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageSize = isNaN(event.take) ? this.actionData.length : event.take;
    this.loadPages();
  }
  formatDate(myStringDate: string) {
    return new Date(parseInt(myStringDate.substr(6)));
  }
  public filterChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.actionGridData = process(this.actionData, this.state);
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.actionGridData = {
      data: orderBy(this.actionData, this.sort),
      total: this.actionData.length
    };
  }
  public showHideFilter() {
    this.showFilter = this.showFilter ? false : true;
  }

}
