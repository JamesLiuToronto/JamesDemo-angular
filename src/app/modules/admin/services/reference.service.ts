import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { EnvService } from 'src/app/shared/service/env.service';
import { Reference } from '../model/Reference';


@Injectable({
  providedIn: 'root'
})
export class ReferenceService {


  selectedReference: Reference |undefined ;

  selectedReferenceType = "NA" ;
    
  errorMsg: string | undefined;

  showTypeSelectionChangedEvent = new EventEmitter<string>();


  private baseUrl:string = "url" ;

  constructor( private http: HttpClient, private httpUtility :HttpUtilityService, 
    private environment: EnvService) {
    this.baseUrl = this.environment.serverurl ;
  }
 

  getReferenceList(type:string, sortField:string, direction:number) : Observable<Reference[]>{
    return this.http.get<Reference[]>(this.baseUrl + "/api/reference/by-type/" + type + "/" + sortField + "/" + direction,
                              { headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  getReferenceTypeList() : Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/api/reference/type-list", { headers: this.httpUtility.getHeader()}).pipe(shareReplay());
  }

  setSelectedReferenceType(type :string){
    this.selectedReferenceType = type ;
    this.showTypeSelectionChangedEvent.emit(type) ;
  }

  getSelectedReferenceType(){
    return this.selectedReferenceType;
  }
   
  setSelectedReference(reference :Reference){
    this.selectedReference = reference ;
  }
  getSelectedReference(){
    return this.selectedReference;
  }
  
}
