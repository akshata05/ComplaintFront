import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../Model/user.model";
import { AuthenicationService } from "./authenication.service";



export abstract class RequestBaseService {
private currentUSer:User=new User;
  protected constructor(private authenticationService:AuthenicationService,private http:HttpClient) { 
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUSer=data;
    });
  }
  get getHeaders():HttpHeaders{
    console.log(this.currentUSer?.accessToken);
    return new HttpHeaders({
      
      authorization:'Bearer '+this.currentUSer?.accessToken,
      "Content-Type":"application/json"
    });
  }
}
