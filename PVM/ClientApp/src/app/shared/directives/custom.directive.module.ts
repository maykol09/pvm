import { NgModule } from "@angular/core";
import { ResponsiveHeightDirective } from './responsive.height.directive';
import { NumberDirective } from './numbers-only.directive';
import { CustomDateBetweenValidatorDirective } from './customDateBetweenValidation.directive';
import { UppercaseDirective } from "./upperCase.directive";


@NgModule({
  exports: [
    ResponsiveHeightDirective,
    NumberDirective,
    CustomDateBetweenValidatorDirective,
    UppercaseDirective
  ],
  declarations: [
    ResponsiveHeightDirective,
    NumberDirective,
    CustomDateBetweenValidatorDirective,
    UppercaseDirective
  ],
})

export class CustomDirectiveModule {}
