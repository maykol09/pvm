import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { DataSharedService } from '../../service/data.service';
import { ReferenceService } from '../../service/reference.service';


@Component({
  selector: 'inactive-posts-modal',
  templateUrl: './inactive-posts.component.html',
})

export class InactivePostsModalComponent implements OnInit {
  staffTypeList: any = [{ data: 'All', staff: 'All' }, { data: 'G Staff', staff: 'G' }, { data: 'N Staff', staff: 'N' }, { data: 'P Staff', staff: 'P' } ]
  StatusList: any;
  OfficeList: any;
  staff_type: any = "";
  office: any = "";
  status: any = "";
  refData: any[] = [];
  constructor(public modal: NgbActiveModal, private dataService: DataSharedService,
    private refService: ReferenceService, private router: Router) {

  }
  ngOnInit() {
    
  }
  submit() {
    this.router.navigate([]).then(result => { window.open("api/Reports/InactiveReports?staff_type=" + this.staff_type, '_blank'); });
  }
}
