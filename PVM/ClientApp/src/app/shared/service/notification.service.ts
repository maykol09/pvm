import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(public toastr: ToastrService
        ) {
        
    }

    setViewContainerRef(vcr : any) {
        //this.toastr.setRootViewContainerRef(vcr);
    }

    showSuccess(text : any) {
        this.toastr.success(text, '', { positionClass: 'toast-bottom-right' });
    }

    showError(text : any) {
        this.toastr.error(text, '', { positionClass: 'toast-bottom-right' });
    }

    showWarning(text : any) {
        this.toastr.warning(text, '', { positionClass: 'toast-bottom-right' });
    }

    showInfo(text : any)  {
        this.toastr.info(text, '', { positionClass: 'toast-bottom-right' });
    }

    showInvalidEmail() {
        this.toastr.error('Email is invalid format.', '', { positionClass: 'toast-bottom-right' });
    }

    showCustom(text : any) {
        //this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
    }

    showDateBetweenError(field : any) {
        this.toastr.error('In ' + field + ' Date from must be less than Date to.', '', { positionClass: 'toast-bottom-right' });
    }

    showUsernameAlreayExists() {
        this.toastr.error('User name already exists.', '', { positionClass: 'toast-bottom-right' });
    }

    showEmployeeNoAlreadyExists() {
        this.toastr.error('Employee no. already exists.', '', { positionClass: 'toast-bottom-right' });
    }

    showSaveSuccess() {
        this.toastr.success('Record saved.', '', { positionClass: 'toast-bottom-right' });
    }

    showNoChangesInfo() {
        this.toastr.info('No changes has been made.', '', { positionClass: 'toast-bottom-right' });
    }

    showEnterRequired() {
        this.toastr.error('Please enter required fields.', '', { positionClass: 'toast-bottom-right' });
    }

}
