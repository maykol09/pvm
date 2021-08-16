import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';
import { NavMenuModule } from './shared/nav-menu/nav-menu.module';
import { FooterModule } from './shared/footer/footer.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpSpinnerInterceptor } from './shared/interceptor/http.spinner.interceptor';
import { SpinnerService } from './shared/service/spinner.services';
import { ToastrModule } from 'ngx-toastr';
import { ReportsComponent } from './reports/reports.component';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { VacantPostsModalModule } from './shared/nav-menu/vacant-posts/vacant-posts.module';
import { InactivePostsModalModule } from './shared/nav-menu/inactive posts/inactive-posts.module';
import { SelectionModalModule } from './shared/nav-menu/selection/selection.module';
import { PositionCreatedModalModule } from './shared/nav-menu/position-created/position-created.module';
import { NoAccessModule } from './no-access/no-access.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent, pathMatch: 'full' },

    ]),
    BrowserModule,
    NavMenuModule,
    HomeModule,
    FooterModule,
    BrowserAnimationsModule,
    VacantPostsModalModule,
    InactivePostsModalModule,
    SelectionModalModule,
    PositionCreatedModalModule,
    MaintenanceModule,
    NoAccessModule,
    ToastrModule.forRoot()
  ],
  providers: [

    SpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpSpinnerInterceptor,
      multi: true,
      deps: [SpinnerService]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
