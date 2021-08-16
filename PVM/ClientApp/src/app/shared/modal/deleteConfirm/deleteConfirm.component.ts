import { Component, Input } from "@angular/core";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'deleteConfirm-modal',
  templateUrl: './deleteConfirm.component.html',
})

export class CustomDeleteConfirmModalComponent {

  constructor(public modal: NgbActiveModal) {
  }

}
