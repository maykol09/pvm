
import { Injectable } from "@angular/core";
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  apiUrl: string;
  constructor(private http: HttpClient,
    private utilities: UtilitiesService, private formBuilder: FormBuilder) {
    this.apiUrl = utilities.getApiUrl();
  }
  GetUser() {
    return this.http.get(this.apiUrl + "api/Maintenance/GetUser");
  }
  SaveUser(data : any) {
    return this.http.post(this.apiUrl + "api/Maintenance/SaveUser", data);
  }
  DelUser(id: number) {
    var params = new HttpParams().append('lib_user_level_id', id.toString());
    return this.http.post(this.apiUrl + "api/Maintenance/DelUser", null, { params: params });
  }
  SaveRef(data: any) {
    return this.http.post(this.apiUrl + "api/Maintenance/SaveRef", data);
  }
  DelRef(id: number) {
    var params = new HttpParams().append('action_id', id.toString());
    return this.http.post(this.apiUrl + "api/Maintenance/DelRef", null, { params: params });
  }
  ActionFormGroup() {
    return this.formBuilder.group({
      action_id: [0],
      staff_type:["", Validators.required],
      action_stage:["", Validators.required],
      action_step: ["", Validators.required],
      next_step: ["", Validators.required],
      is_active: ["", Validators.required],
      for_per_only: []
    })
  }
  UserFormGroup() {
    return this.formBuilder.group({
      lib_user_level_id: [0],
      user_name: ["", Validators.required],
      name: [{value:"", disabled:true}],
      updated_by: [],
      date_updated: [],
      is_active:[true],
      action: []
    })
  }

}
