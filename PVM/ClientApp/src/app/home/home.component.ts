import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { KendoInput } from '@progress/kendo-angular-common';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from '../shared/service/utilities.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  staffType: string = 'G';
  apiUrl: string = "";
  constructor(private http: HttpClient, private utilities: UtilitiesService) {
    this.apiUrl = utilities.getApiUrl();
  }

  ngOnInit(): void {
  }
  onTabSelect(event : any) {
    this.staffType = event.title.substring(0, 1);

  }
  reports() {
    this.reportsApi().subscribe((data : any)=> {
      console.log(data);
    })
  }

  reportsApi() {
    var test = "";
    return this.http.get(this.apiUrl + "api/Home/PostReports");
  }
}
