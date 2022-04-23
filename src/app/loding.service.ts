import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LodingService {
private stoploading=new Subject<boolean>();
stoploading$=this.stoploading.asObservable();
  constructor() { 

  }
  ShouldStoploading(stop:boolean){
this.stoploading.next(stop);
  }
}
