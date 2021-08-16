import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { DataSharedService } from '../../service/data.service';
import { ReferenceService } from '../../service/reference.service';


@Component({
  selector: 'vacant-posts-modal',
  templateUrl: './vacant-posts.component.html',
})

export class VacantPostsModalComponent implements OnInit {
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
    this.refService.GetReference().subscribe(data => {
      this.refData.push(data);
      this.refData[0].table.push({ ref_name: 'All', ref_type: 'status', sort_order: -1 }, { ref_name: 'All(exclude Archive)', ref_type: 'status', sort_order: 0 });
      this.StatusList = _.sortBy(_.filter(this.refData[0].table, { ref_type: 'status' }), ['sort_order']);
      this.refData[0].table1.push({ office_code: 'All', ref_type: 'office_code', sort_order: 0});
      this.OfficeList = _.sortBy(this.refData[0].table1, ['office_code']);

    })
  }
  submit() {
    this.router.navigate([]).then(result => { window.open("api/Reports/VacantReports?staff_type=" + this.staff_type + "&status=" + this.status + "&office=" + this.office, '_blank'); });
  }
}
