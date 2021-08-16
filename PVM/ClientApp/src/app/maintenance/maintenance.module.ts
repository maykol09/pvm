import { NgModule } from "@angular/core";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { CustomDirectiveModule } from '../shared/directives/custom.directive.module';
import { HttpClientModule } from "@angular/common/http";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ConfirmModalModule } from '../shared/modal/confirmation/confirm.modal.module';
import { CustomConfirmModalModule } from '../shared/modal/confirm/confirm.module';
import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { CommonModule } from "@angular/common";
import { ReferenceComponent } from "./reference/reference.component";
import { UserComponent } from "./user/user.component";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { AddReferenceComponent } from "./reference/add-reference/add-reference.component";


const routes: Routes = [{
  path: "reference",
  component: ReferenceComponent,
}, {
  path: "user",
  component: UserComponent
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
    NgbModule
  ],
  declarations: [ReferenceComponent, AddReferenceComponent, UserComponent, AddUserComponent],
  bootstrap: [ReferenceComponent, AddReferenceComponent, UserComponent, AddUserComponent],
  entryComponents: [AddUserComponent]
})

export class MaintenanceModule { }
