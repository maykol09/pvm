import { Component, Input, OnInit} from '@angular/core';

import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/service/notification.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceService } from '../../maintenance.service';
import { UtilitiesService } from '../../../shared/service/utilities.service';
import { FormGroup } from '@angular/forms';
import { ReferenceService } from '../../../shared/service/reference.service';
import { DataSharedService } from '../../../shared/service/data.service';
const matches = (el: any, selector: any) => (el.matches || el.msMatchesSelector).call(el, selector);
@Component({
  selector: 'app-maitenance-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['../../maintenance.component.css'],
})
export class AddUserComponent implements OnInit {
  form: any = [];
  usernameList: any;
  _usernameList: any;
  usernameData: any = [];
  currentUser: string = "";
  @Input() action: string = "";
  @Input() data: any = {};

  constructor(private toastr: NotificationService,
    private service: MaintenanceService,
    private util: UtilitiesService,
    public modal: NgbActiveModal,
    private ref: ReferenceService,
    private dataShared: DataSharedService  ) {
    this.form = this.service.UserFormGroup();
    var sub = this.ref.ref.subscribe((data: {}) => {
      this.usernameData.push(data);
      this._usernameList = this.usernameData[0].table3;
      this.usernameList = this._usernameList.slice();
    })
    sub.unsubscribe();
    var sub2 = this.dataShared.users.subscribe(data => {
      this.currentUser = data;
    })
    sub2.unsubscribe();
  }
  handleFilter(value: any) {
    this.usernameList = this._usernameList.filter((s: any) =>
      s.user_name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
  selectionChange(value: any) {
    var name = _.filter(this.usernameList, { "user_name": value });
    this.form.patchValue({ "name": name[0].name });
  }
  ngOnInit(): void {
    if (this.action === "U") {
      this.form.patchValue(this.data);
    }
  }
  SaveUser() {
    if (this.form.invalid) {
      this.validation(this.form);
    } else {
      var allData = this.form.getRawValue();
      allData.updated_by = this.currentUser;
      allData.action = this.action;
      this.service.SaveUser(allData).subscribe(data => {
        this.toastr.showSuccess("Record saved.")
        this.modal.close('save');
      })
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
}
