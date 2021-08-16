import { Component, Input, OnInit} from '@angular/core';

import * as _ from 'lodash';
import { NotificationService } from 'src/app/shared/service/notification.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceService } from '../../maintenance.service';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-maitenance-add-reference',
  templateUrl: './add-reference.component.html',
  styleUrls: ['../../maintenance.component.css'],
})
export class AddReferenceComponent implements OnInit {
  form: any = [];
  staffTypeList: any = [{ data: 'G Staff', staff: 'G' }, { data: 'N Staff', staff: 'N' }, { data: 'P Staff', staff: 'P' }]
  currentUser: string = "";
  @Input() action: string = "";
  @Input() data: any = {};

  constructor(private toastr: NotificationService,
    private service: MaintenanceService, public modal: NgbActiveModal,) {
    this.form = this.service.ActionFormGroup();

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
      allData.action = this.action;
      this.service.SaveRef(allData).subscribe(data => {
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
