import { NgModule } from "@angular/core";
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { CustomDirectiveModule } from '../shared/directives/custom.directive.module';
import { HttpClientModule } from "@angular/common/http";
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from "@angular/router";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { CommonModule } from "@angular/common";
import { NoAccessComponent } from "./no-access.component";



const routes: Routes = [{
  path: "noAccess",
  component: NoAccessComponent,
}]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule,
    CommonModule,

  ],
  declarations: [NoAccessComponent],
  bootstrap: [NoAccessComponent],

})

export class NoAccessModule {}
