import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Complaints } from '../common/complaints';
import { ComplaintsComponent } from '../complaints/complaints.component';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsServiceService {
private baseUrl="http://localhost:8080";

complaintList:Complaints[];
  constructor(private httpClient:HttpClient) { 
    
    this.complaintList=new Array();
  }
  
  addComplaint(complaints:Complaints):Observable<Complaints>{
return this.httpClient.post<Complaints>(this.baseUrl.concat("/add"),complaints);
  }
  ViewComplaint():Observable<Complaints[]>{
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/view"));
      
  }
  GetComplainByStatus(status:string):Observable<Complaints[]>{
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/complains/")+status);
      
  }
  ViewOneComplaint(id:number):Observable<Complaints>{
    return this.httpClient.get<Complaints>(this.baseUrl.concat("/fetch/")+id);
  }
  updateComplaint(complaints:Complaints):Observable<Complaints>{
    return this.httpClient.put<Complaints>(this.baseUrl.concat("/update"),complaints);
      }
      deleteComplaint(id:number):Observable<number>{
        return this.httpClient.delete<number>(this.baseUrl.concat("/delete/")+id);
      }


     
}

interface GetResponse{
  _embedded:{
    add:Complaints,
    view:Complaints[];
  }
  
}