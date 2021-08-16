import { Component } from '@angular/core';
import { SpinnerService } from './shared/service/spinner.services';
import { ReferenceService } from './shared/service/reference.service';
import { DataService } from '@progress/kendo-angular-dropdowns';
import { DataSharedService } from './shared/service/data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UtilitiesService } from './shared/service/utilities.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiUrl: string = "";
  loading: boolean = false;
  constructor(private spinner: SpinnerService, private ref: ReferenceService,
    private dataService: DataSharedService, private http: HttpClient,
    private util: UtilitiesService, private route: Router) {
    this.ref.GetReference().subscribe(data => {
      this.ref.GetRef(data);
    })
    this.apiUrl = util.getApiUrl();

    var sub2 = this.CheckUserAccess().subscribe(userData => {
      if (userData === "noAccess") {
        this.route.navigate(["noAccess"]);
      }
      sub2.unsubscribe();
    })

    this.spinner
      .onLoadingChanged
      .subscribe(isLoading => {
        this.loading = !isLoading;
      });
    this.dataService.GetCurrentUser().subscribe(data => {
      this.dataService.loadUser(data);
    })
  }
  CheckUserAccess() {

    return this.http.get(this.apiUrl + "api/Maintenance/CheckUser");
  }


}
