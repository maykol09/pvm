import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { DataSharedService } from '../../service/data.service';
import { ReferenceService } from '../../service/reference.service';


@Component({
  selector: 'position-created-modal',
  templateUrl: './position-created.component.html',
})

export class PositionCreatedModalComponent implements OnInit {
  staffTypeList: any = [{ data: 'G Staff', staff: 'G' }, { data: 'N Staff', staff: 'N' }, { data: 'P Staff', staff: 'P' } ]
  PdStatusList: any[] = [];
  pd_status: any = "";
  staff_type: any = "";
  start_date: any = "";
  end_date: any = "";
  refData: any[] = [];

  constructor(public modal: NgbActiveModal, private dataService: DataSharedService,
    private refService: ReferenceService, private router: Router) {

  }
  ngOnInit() {
    this.refService.ref.subscribe(data => {
      this.refData.push(data);
      this.PdStatusList = _.filter(this.refData[0].table, { ref_type: 'pd_status' });
    });
  }
  submit() {
    var start_date = new Date(this.start_date).toLocaleDateString();
    var end_date = new Date(this.end_date).toLocaleDateString();
    this.router.navigate([]).then(result => { window.open("api/Reports/PositionCreatedReports?staff_type=" + this.staff_type + "&pd_status=" + this.pd_status + "&start_date=" + start_date + "&end_date=" + end_date, '_blank'); });
  }
}
