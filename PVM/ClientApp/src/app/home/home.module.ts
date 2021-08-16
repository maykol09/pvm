import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CommonModule } from "@angular/common";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { CustomDirectiveModule } from '../shared/directives/custom.directive.module';
import { StaffComponent } from './staff/staff.component';
import { HttpClientModule } from "@angular/common/http";
import { FormModalComponent } from './form-modal/form-modal.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { PostDetailsComponent } from './form-modal/post-details/post-details.component';
import { ActionHistoryComponent } from './form-modal/action-history/action-history.component';
import { ReqtDocumentsComponent } from './form-modal/reqt-documents/reqt-documents.component';
import { ConfirmModalModule } from '../shared/modal/confirmation/confirm.modal.module';
import { CustomConfirmModalModule } from '../shared/modal/confirm/confirm.module';
import { PrintFormComponent } from './form-modal/print-form/print-form.component';


const routes: Routes = [{
  path: "staff",
  component: StaffComponent,
}, {
    path: "home/printForm",
    component: PrintFormComponent

}]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule,
    CommonModule,
    GridModule,
    ExcelModule,
    CustomDirectiveModule,
    HttpClientModule,
    DropDownsModule,
    ReactiveFormsModule,
    DateInputsModule,
    CustomConfirmModalModule
  ],
  declarations: [
    HomeComponent,
    StaffComponent,
    FormModalComponent,
    PostDetailsComponent,
    ActionHistoryComponent,
    ReqtDocumentsComponent,
    PrintFormComponent,
  ], entryComponents: [
    FormModalComponent
  ],
  bootstrap: [
    HomeComponent
  ]
})

export class HomeModule {

}
