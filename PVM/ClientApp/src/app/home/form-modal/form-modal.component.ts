import { Component, Input, OnInit, Output } from "@angular/core";

import * as _ from 'lodash';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataSharedService } from 'src/app/shared/service/data.service';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  @Input() staff_type: string = "";
  @Input() postData: any[] = [];
  @Input() action: string = "";
  disabled: boolean = true;
  constructor(public modal: NgbActiveModal, private dataService: DataSharedService) {
    
  }
  ngOnInit() {
    this.dataService.hasPostId.subscribe(data => {
      if (data === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    })
    if (this.action === 'I') {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
    
  }
  onSubmit() {

    this.modal.close('save');
   
  }
  Close(action : string) {
    this.modal.close(action);
  }
  onTabSelect(event: any) {
  }
}
