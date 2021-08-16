import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { DataSharedService } from '../../service/data.service';
import { ReferenceService } from '../../service/reference.service';


@Component({
  selector: 'selection-modal',
  templateUrl: './selection.component.html',
})

export class SelectionModalComponent implements OnInit {
  staffTypeList: any = [{ data: 'All', staff: 'All' }, { data: 'G Staff', staff: 'G' }, { data: 'N Staff', staff: 'N' }, { data: 'P Staff', staff: 'P' } ]

  staff_type: any = "";
  start_date: any = "";
  end_date: any = "";

  constructor(public modal: NgbActiveModal, private dataService: DataSharedService,
    private refService: ReferenceService, private router: Router) {

  }
  ngOnInit() {
    
  }
  submit() {
    this.router.navigate([]).then(result => { window.open("api/Reports/SelectionReports?staff_type=" + this.staff_type, '_blank'); });
  }
}
