import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { HttpParams, HttpClient } from "@angular/common/http";
import { UtilitiesService } from "./utilities.service";

@Injectable({
  providedIn: 'root'
})

export class DataSharedService {

  apiUrl: string;
  constructor(private http: HttpClient,
    private utilities: UtilitiesService) {
    this.apiUrl = utilities.getApiUrl();
  }

  users = new BehaviorSubject("");
  hasPostId = new BehaviorSubject(0);
  postData = new BehaviorSubject({action: ''});
  forPrintForm = new BehaviorSubject({});
  navMenu = new BehaviorSubject(false);
  //dataFromForm = new BehaviorSubject('');
  //dataFromNav = new BehaviorSubject('');

  loadUser(user: any) {
    this.users.next(user);
  }
  getPostId(post_id: any) {
    this.hasPostId.next(post_id);
  }
  GetCurrentUser() {
    return this.http.get(this.apiUrl + "api/Home/GetCurrentUser");
  }
  GetPostData(data : any) {
    this.postData.next(data);
  }
  assignValuePrintFOrm(data: any) {
    this.forPrintForm.next(data);
  }
  isNavMenuHide(navMenu: any) {
    this.navMenu.next(navMenu);
  }

  //saveDataFromForm(data: any) {
  //  this.dataFromForm.next(data);
  //}

  //saveDataFromNav(data: any) {
  //  this.dataFromNav.next(data);
  //}

  //DeleteData(id, form) {
  //  var params = new HttpParams().append("id", id).append("form", form);
  //  return this.http.post(this.apiUrl + "/api/Forms/DeleteData", null, { params: params });
  //}
}
