import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  private getURL="https://cs251-outlab-6.herokuapp.com/initial_values";
  private postURL=" https://cs251-outlab-6.herokuapp.com/add_new_feedback/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }
  getdefaultform():Observable<User>{
    return this.http.get<User>(this.getURL).pipe(
      catchError(this.handleError))
  }
  addform(form:User):Observable<User>{
    return this.http.post<User>(this.postURL,form, this.httpOptions).pipe(
      catchError(this.handleError));
  }
  handleError(err:HttpErrorResponse){
    if (err.error instanceof ErrorEvent) {
      // client-side error
     console.log(`Error: ${err.error.message}`);
    } else {
      // server-side error
      if(err.status<500){
       console.log(`Wong Input from user with ErrorCode: ${err.status}\nMessage: ${err.message}`);
      }
      else{
       console.log(`Problem with server with Error Code: ${err.status}\nMessage: ${err.message}`);
      }
    }
    
     return throwError(err);
   }
}
