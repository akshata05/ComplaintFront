import { HttpClient } from '@angular/common/http';
import { CompileClassMetadataFn } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Complaints } from '../common/complaints';
import { ComplaintStatus } from '../common/complaintsStatus';
import { ComplaintsComponent } from '../complaints/complaints.component';
import { User } from '../Model/user.model';
import { AuthenicationService } from './authenication.service';
import { RequestBaseService } from './request-base.service';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsServiceService extends RequestBaseService {
private baseUrl="http://localhost:8080";

complaintList:Complaints[];
  constructor(authenticationService:AuthenicationService,private httpClient:HttpClient) { 
    super(authenticationService,httpClient);
    this.complaintList=new Array();
  }
  
  addComplaint(complaints:Complaints,id:Number):Observable<any>{
return this.httpClient.post<any>(this.baseUrl.concat("/complain/customer/"+id+"/addcomplains"),complaints,{headers:this.getHeaders});
  }
  ViewComplaint():Observable<Complaints[]>{
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/view"));
      
  }
  GetComplainByStatus(status:string,id:Number):Observable<Complaints[]>{
    console.log("Inside");
    console.log(this.getHeaders);
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/complain/")+status+"/"+id,{headers:this.getHeaders});
      
  }
  GetComplainByStatusForEngineers(status:string,id:Number):Observable<Complaints[]>{
    console.log("Inside");
    console.log(this.getHeaders);
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/complain/engineer/")+status+"/"+id,{headers:this.getHeaders});
      
  }
  AddResolution(resolution:ComplaintStatus,id:number):Observable<Complaints>{
    return  this.httpClient.put<Complaints>(this.baseUrl.concat("/complain/"+id+"/resolution"),resolution,{headers:this.getHeaders});
  }
  AddFeedback(feedback:ComplaintStatus,id:number):Observable<Complaints>{
    return  this.httpClient.put<Complaints>(this.baseUrl.concat("/complain/"+id+"/feedback"),feedback,{headers:this.getHeaders});
  }
  GetComplains(status:string):Observable<Complaints[]>{
    
    return this.httpClient.get<Complaints[]>(this.baseUrl.concat("/complain/"+status),{headers:this.getHeaders});
      
  }
  AssignEngineer(engineerId:Number,id:number):Observable<Complaints>{
    return this.httpClient.put<Complaints>(this.baseUrl.concat("/complain/"+id+"/assignengineer/"+engineerId),{},{headers:this.getHeaders});
  
  
  }
  GetPincode(id:number):Observable<String>{
    return this.httpClient.get<String>(this.baseUrl.concat("/complain/fetch/")+id+"/customer",{headers:this.getHeaders});
  }
  GetEngineers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseUrl.concat("/api/user/engineer"),{headers:this.getHeaders});
  }
  ViewOneComplaint(id:number):Observable<Complaints>{
    return this.httpClient.get<Complaints>(this.baseUrl.concat("/complain/fetch/")+id,{headers:this.getHeaders});
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