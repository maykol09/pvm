import { Injectable, EventEmitter } from '@angular/core';

import { PlatformLocation } from '@angular/common';
//import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  postData = new EventEmitter();
  public url: any[] = location.href.split('/');
  constructor(private platformLocation: PlatformLocation) {
    
  }

  getApiUrl() {
    var apiUrl = "";

    if (this.url[2].includes('localhost')) { //dev
      apiUrl = this.url[0] + '//' + this.url[2] + '/';
    }
    else {
      apiUrl = this.url[0] + '//' + this.url[2] + '/pvm/';
    }
    return apiUrl;
  }

  FormatDate(date : string) {

      date = new Date(date).toLocaleDateString('en-GB', {
        day: "2-digit",
        month: 'short',
        year: 'numeric'
      });
      return date;
  }



  getUrl() {
    var origin = window.location.origin;
    var url;
    if ((origin.indexOf("apps-dev.wpro.who.int") >= 0)) {
      url = "http://apps-dev.wpro.who.int/pvm";
    }
    else if ((origin.indexOf("apps.wpro.who.int") >= 0)) {
      url = "http://apps.wpro.who.int/pvm";
    }
    else {
      url = "https://localhost:44305/";
    }
    return url;
  }


}
