import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import { NotificationService } from 'src/app/shared/service/notification.service';
import * as _ from 'lodash';
import { ReferenceService } from 'src/app/shared/service/reference.service';
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import { FormModalService } from '../form-modal.service';
import { DataSharedService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['../form-modal.component.css']
})
export class PostDetailsComponent implements OnInit {
  PostDetails: any = [];
  @Input() staff_type: string = "";
  @Input() postData: any[] = [];
  @Input() action: string = "";
  StaffTypeList: any[] = [];
  OfficeList: any[] = [];
  UnitList: any[] = [];
  DivList: any[] = [];
  PostTypeList: any[] = [];
  StatusList: any[] = [];
  PdStatusList: any[] = [];
  GeophicalOriginList: any[] = [];
  Gender: any[] = [{ data: 'M' }, { data: 'F' }];
  refData: any[] = [];
  PriorityLevel = [{ data: 1 }, { data: 2 }, { data: 3 }]
  newPostData: any = {};
  post_id: any = 0;
  forPrintForm: any[] = [];
  constructor(public modal: NgbActiveModal, private service: FormModalService,
    private toastr: NotificationService, private refService: ReferenceService,
    private util: UtilitiesService, private dataService: DataSharedService,
    private router: Router) {
    this.PostDetails = this.service.FormGroup();
  }

  ngOnInit(): void {
    this.refService.ref.subscribe(data => {
      this.refData.push(data);
      this.StaffTypeList = _.filter(this.refData[0].table, { ref_type: 'grade_level', ref_group: this.staff_type });
      this.OfficeList = this.refData[0].table1;
      this.UnitList = this.refData[0].table2;
      this.DivList = _.uniqBy(this.refData[0].table2, 'dir_code');
      this.DivList = _.filter(this.DivList, function (d) { return d.dir_code === null ? '' : d }).sort();
      this.DivList = _.sortBy(this.DivList, ['dir_code']);
      this.PostTypeList = _.filter(this.refData[0].table, { ref_type: 'post_type' })
      this.StatusList = _.filter(this.refData[0].table, { ref_type: 'status' });
      this.PdStatusList = _.filter(this.refData[0].table, { ref_type: 'pd_status' });
      this.GeophicalOriginList = _.filter(this.refData[0].table, { ref_type: 'selected_geographical_origin' })
      var office = _.filter(this.refData[0].table1, function (d) {
        return d.sort_order === 50 || d.sort_order === 100 ? d : '';
      })
      //this.dataService.postData.subscribe(data => {
      var postData;
      this.dataService.postData.subscribe(dataPost => {
        postData = dataPost.action === 'U' ? dataPost : this.postData[0];
        if (dataPost.action === 'U') {
          this.action = dataPost.action;
        }

        if (this.postData.length > 0) {
          if (postData.vacant_since !== null && postData.vacant_since !== '' && postData.vacant_since !== undefined) {
            postData.vacant_since = new Date(postData.vacant_since);
          }
          if (postData.date_updated !== null && postData.date_updated !== '' && postData.date_updated !== undefined) {
            postData.date_updated = new Date(postData.date_updated);
          }
          if (postData.vn_close_date !== null && postData.vn_close_date !== '' && postData.vn_close_date !== undefined) {
            postData.vn_close_date = new Date(postData.vn_close_date);
          }
          if (postData.target_completion_date !== null && postData.target_completion_date !== '' && postData.target_completion_date !== undefined) {
            postData.target_completion_date = new Date(postData.target_completion_date);
          }
        } else {
          this.postData = [{}];
        }
        this.newPostData = postData;
      })

      this.PostDetails.patchValue(postData);
      //this.newPostData.action !== undefined || this.postData[0].post_id !== undefined ? this.action = "U" : this.action = "I";
      for (var ctr = 0; ctr <= office.length; ctr++) {
        if (office[ctr] !== undefined) {
          this.UnitList.push({ unit_code: office[ctr].office_code });
          this.DivList.push({ dir_code: office[ctr].office_code });
        }
      }
    });
  }

  onSubmit() {
    if (this.PostDetails.invalid) {
      this.validation(this.PostDetails);
    } else {

      var rawValue = this.PostDetails.getRawValue();
      rawValue.staff_type = this.staff_type;
      rawValue.action = this.action;
      this.action === "U" && this.post_id > 0 ? rawValue.post_id = this.post_id : '';
      const sub = this.service.SavePost(rawValue).subscribe((data: {}) => {
        this.toastr.showSuccess("Record saved.");
        this.dataService.getPostId(data);
        rawValue.action = 'U';
        rawValue.post_id = data;
        this.post_id = data;
        this.action = "U";
        this.dataService.GetPostData(rawValue);

        sub.unsubscribe();

      });
    }
  }

  validation(formGroup: FormGroup) {
    var required = false;
    _.forEach(formGroup.controls, function (control) {
      control.markAsTouched();
      if (control.errors !== null) {
        required = control.errors.required ? true : false;
      }
    })
    if (required) {
      this.toastr.showError('Please fill the required field(s).');
    }
  }
  printForm() {

    sessionStorage.setItem("postDetails", JSON.stringify(this.newPostData));
    //this.dataService.assignValuePrintFOrm(this.newPostData);
    this.router.navigate([]).then(result => { window.open("home/printForm", '_blank'); });
  }
  email() {
    var sub = this.service.CreateMailItem(this.newPostData).subscribe(data => {
      this.toastr.showSuccess("Email Template Sent.");
      sub.unsubscribe();
    });
  }
  reminder() {
    var sub = this.service.Reminder(this.newPostData.post_no, this.newPostData.post_title).subscribe(data => {
      //this.toastr.showSuccess('Reminder ')
      this.toastr.showSuccess("Reminder Sent.");
      sub.unsubscribe();
    })
  }
}

