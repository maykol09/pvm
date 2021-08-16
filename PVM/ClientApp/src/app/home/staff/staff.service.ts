import { Injectable } from "@angular/core";
import { UtilitiesService } from 'src/app/shared/service/utilities.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StaffService {
  apiUrl: string;
  constructor(private http: HttpClient,
    private utilities : UtilitiesService){
    this.apiUrl = utilities.getApiUrl();
  }

  GetPost(staffType: string) {
    var params = new HttpParams().append("staff_type", staffType);
    return this.http.post(this.apiUrl + 'api/Home/GetPost', null, { params: params })
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }
  DeletePost(post_id: number) {
    var params = new HttpParams().append("post_id", post_id.toString());
    return this.http.post(this.apiUrl + 'api/Home/DeletePost', null, { params: params })
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }
  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
