import { NgModule } from '@angular/core';

import { ConfirmModalComponent, ConfirmTemplateDirective, ConfirmChangesModalComponent } from "./confirm.modal.component";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    exports: [
        ConfirmModalComponent,
        ConfirmChangesModalComponent,
        ConfirmTemplateDirective
    ],
    imports: [

        NgbModule,

        //RouterModule.forChild(routes)
    ],
    declarations: [ConfirmModalComponent,
                    ConfirmChangesModalComponent,
                    ConfirmTemplateDirective]
})
export class ConfirmModalModule { }
