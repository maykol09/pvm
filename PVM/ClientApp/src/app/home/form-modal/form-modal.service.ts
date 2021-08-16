import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataSharedService } from 'src/app/shared/service/data.service';

@Injectable({
  providedIn: 'root'
})

export class FormModalService {
  apiUrl: string = "";
  username: string = "";
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private utilities: UtilitiesService, private dataService: DataSharedService) {
    this.apiUrl = utilities.getApiUrl();
    var sub = this.dataService.users.subscribe(data => {
      this.username = data;
     
    })
    sub.unsubscribe();
  }
  SavePost(data: FormDataEntryValue) {
    return this.http.post(this.apiUrl + "api/Home/SavePost", data);
  }
  GetActionHistory(post_id: number) {
    var params = new HttpParams().append("post_id", post_id.toString());
    return this.http.post(this.apiUrl + "api/Home/GetActionHistory", null, { params: params });
  }
  SaveActionHistory(data: any) {
    return this.http.post(this.apiUrl + "api/Home/SaveActionHistory", data);
  }
  GetActionHistoryRef() {
    return this.http.get(this.apiUrl + "api/Home/GetActionHistoryRef");
  }
  GetReqtDocuments(post_id: number) {
    var params = new HttpParams().append("post_id", post_id.toString());
    return this.http.post(this.apiUrl + "api/Home/GetReqtDocuments", null, { params: params });
  }
  SaveReqtDocuments(data: any) {
    return this.http.post(this.apiUrl + "api/Home/SaveReqtDocuments", data);
  }
  GetReqtDocumentsRef() {
    //var params = new HttpParams().append("post_id", post_id.toString());
    return this.http.get(this.apiUrl + "api/Home/GetReqtDocumentsRef");
  }
  CreateMailItem(data: any) {
    return this.http.post(this.apiUrl + "api/Home/CreateMailItem", data);
  }
  Reminder(post_no: any, post_title: any) {
    var params = new HttpParams().append("post_no", post_no)
                                 .append("post_title", post_title);
    
    return this.http.post(this.apiUrl + "api/Home/Reminder", null, { params: params });
  }
  FormGroup(): FormGroup {
    return this.formBuilder.group({
      post_id: [0],
      staff_type: [],
      post_no: [0, Validators.required],
      rec_no: [0],
      vn_no: [],
      vn_close_date: [],
      vn_url: [],
      contract_duration: [],
      post_title: ['', Validators.required],
      office_code: [],
      dir_code: ['', Validators.required],
      unit_code: [],
      grade_level: ['', Validators.required],
      post_type: ['', Validators.required],
      fund_code: [],
      allotment_no: [],
      last_incumbent: [],
      vacant_since: [],
      temporary_staff: [],
      no_of_applicants: [0],
      no_of_internal_applicants: [0],
      selected_candidate: [],
      selected_gender: [],
      selected_source: [],
      selected_geographical_origin: [],
      selected_geographical_origin_ctry: [],
      post_remarks: [],
      per_remarks: [],
      dir_remarks: [],
      wrclo_remarks: [],
      history_remarks: [],
      pd_status: ['New', Validators.required],
      post_status: ['Active', Validators.required],
      with_incumbent: [],
      in_reports: [],
      priority_level: [],
      target_completion_date: [],
      hiring_manager: [],
      user_name: [{ value: this.username, disabled: true }],
      date_updated: [{ value: new Date(), disabled: true }],
      action: []
    })
  }
  FormGroupAction() {
    return this.formBuilder.group({
      post_action_id: [0],
      post_id: [0],
      action_step: [],
      action_date: ["", Validators.required],
      action_id: [0],
      action_remarks: [],
      per_remarks: [],
      action_stage: [{value: "", disabled: true}],
      next_step: [{ value: "", disabled: true }],
      for_per_only: [{ value: '', disabled: true }]
    });
  }
  FormGroupReqt() {
    return this.formBuilder.group({
      post_reqt_id: [0],
      post_id: [0],
      reqt_id: [],
      reqt_date: [],
      reqt_remarks: [],
      user_name: [],
    });
  }
}
