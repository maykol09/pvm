import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReferenceService {
  apriUrl: string = "";
  ref = new BehaviorSubject([]);
 
  constructor(private http : HttpClient, private util : UtilitiesService) {
    this.apriUrl = this.util.getApiUrl();
  }
  GetRef(ref : any) {
    this.ref.next(ref);
  }
  GetReference() {
    return this.http.get(this.apriUrl + "api/Home/GetReference");
    
  }
}
