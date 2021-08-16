import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormModalService } from '../form-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSharedService } from 'src/app/shared/service/data.service';
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.css']
})
export class PrintFormComponent implements OnInit, AfterViewInit {
  PostDetails: any = [];
  postData: any = [];
  post_id: number = 0;
  actionData: any = {};
  reqtData: any = {};
  constructor(private service: FormModalService, private route: ActivatedRoute, private dataShared: DataSharedService,
    private dataService: DataSharedService, private formModalService: FormModalService, private router: Router,
    private util: UtilitiesService) {
    var counter = 0;

    router.events.subscribe((event: any) => {
      counter++;
      if (counter === 1) {
        var noAccess = event.snapshot.routeConfig.path === "home/printForm" ? true : false;
        this.dataShared.isNavMenuHide(noAccess);
      }

    });
    this.PostDetails = this.service.FormGroup();
    this.postData = sessionStorage.getItem("postDetails");
    var newPostDetails = JSON.parse(this.postData);
    this.PostDetails.patchValue(newPostDetails);
    this.post_id = newPostDetails.post_id;
    var formatDate = this.util;
    this.formModalService.GetActionHistory(this.post_id).subscribe((data: {}) => {
      _.forEach(data, function (d: any) {
        return d.action_date = new Date(formatDate.FormatDate(d.action_date));
      });
      this.actionData = data;
    })

    var formatDate = this.util;
    this.service.GetReqtDocuments(this.post_id).subscribe((data: {}) => {
      _.forEach(data, function (d: any) {
        return d.reqt_date = new Date(formatDate.FormatDate(d.reqt_date));
      });
      this.reqtData = data;
    })
   
  }
  ngAfterViewInit() {
    this.dataService.isNavMenuHide(true);
    setTimeout(function () {
      window.print();
    })
   
  }
  ngOnInit(): void {
    
  }

}
