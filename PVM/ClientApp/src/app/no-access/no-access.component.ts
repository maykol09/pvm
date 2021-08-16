import { Component, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import * as _ from 'lodash';
import { DataSharedService } from '../shared/service/data.service';
@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css'],
})
export class NoAccessComponent {


  constructor(private route: Router, private dataShared: DataSharedService) {
    var counter = 0;

    route.events.subscribe((event: any) => {
      counter++;
      if (counter === 1) {
        var noAccess = event.snapshot.routeConfig.path === "noAccess" ? true : false;
        this.dataShared.isNavMenuHide(noAccess);
      }

    });
  }
  
}
