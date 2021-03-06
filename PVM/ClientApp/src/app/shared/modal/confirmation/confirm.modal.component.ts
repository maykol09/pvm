import { Component, Injectable, Directive, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

/**
 * Options passed when opening a confirmation modal
 */
interface ConfirmOptions {
    /**
     * The title of the confirmation modal
     */
    title: string,

    /**
     * The message in the confirmation modal
     */
    message: string
}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
    /**
     * The last options passed ConfirmService.confirm()
     */
    options: ConfirmOptions;

    /**
     * The last opened confirmation modal
     */
    modal: NgbModalRef;

    /**
     * The template containing the confirmation modal component
     */
    template: TemplateRef<any>;
}

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal, private state: ConfirmState) { }

    /**
     * Opens a confirmation modal
     * @param options the options for the modal (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the modal
     */
    confirm(options: ConfirmOptions): Promise<any> {
        this.state.options = options;
        this.state.modal = this.modalService.open(this.state.template, {
            centered: true, backdrop: 'static',
            keyboard: false
        });
        return this.state.modal.result;
    }

    confirmByTemplate(options: ConfirmOptions, template: any): Promise<any> {
        this.state.options = options;
        this.state.modal = this.modalService.open(template, {
            centered: true, backdrop: 'static',
            keyboard: false
        });
        return this.state.modal.result;
    }
}

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
    selector: 'confirm-modal-component',
    template: `<div class="modal-header">
   
    <h4 class="modal-title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{ options.title }}</h4>
  </div>
  <div class="modal-body">
    <div innerHTML="{{options.message}}"></div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary btn-sm" (click)="yes()"><i class="fa fa-check" aria-hidden="true"></i> Confirm</button>
    <button type="button" class="btn btn-secondary btn-sm" (click)="no()">Cancel</button>
  </div>`,
    //providers: [ConfirmState]
})
export class ConfirmModalComponent {

    options: ConfirmOptions;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    yes() {
        this.state.modal.close('confirmed');
    }

    no() {
        this.state.modal.dismiss('not confirmed');
    }
}

@Component({
    selector: 'confirmChanges-modal-component',
    template: `<div class="modal-header">
   
    <h4 class="modal-title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{ options.title }}</h4>
  </div>
  <div class="modal-body">
    <div innerHTML="{{options.message}}"></div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-success btn-sm" (click)="yes()"><i class="fa fa-check" aria-hidden="true"></i> Yes</button>
    <button type="button" class="btn btn-primary btn-sm" (click)="no()"><i class="fa fa-check" aria-hidden="true"></i> No</button>
    <button type="button" class="btn btn-secondary btn-sm" (click)="cancel()">Cancel</button>
  </div>`,
    //providers: [ConfirmState]
})
export class ConfirmChangesModalComponent {

    options: ConfirmOptions;

    constructor(private state: ConfirmState) {
        this.options = state.options;
    }

    yes() {
        this.state.modal.close(true);
    }

    no() {
        this.state.modal.close(false);
    }

    cancel() {
        this.state.modal.dismiss('not confirmed');
    }

}

/**
 * Directive allowing to get a reference to the template containing the confirmation modal component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-modal-component></confirm-modal-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
    selector: "[confirm]"
})
export class ConfirmTemplateDirective {
    constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
        state.template = confirmTemplate;
    }
}


//@Component({
//    selector: 'some-applicative-component',
//    templateUrl: './some-applicative-component.html'
//})
//export class SomeApplicativeComponent {
//    constructor(private confirmService: ConfirmService) { }

//    deleteFoo() {
//        this.confirmService.confirm({ title: 'Confirm deletion', message: 'Do you really want to delete this foo?' }).then(
//            () => {
//                console.log('deleting...');
//            },
//            () => {
//                console.log('not deleting...');
//            });
//    }
//}
