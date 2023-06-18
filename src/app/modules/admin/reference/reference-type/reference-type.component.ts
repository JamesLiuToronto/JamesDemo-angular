import { Component } from '@angular/core';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ReferenceService } from '../../services/reference.service';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';

@Component({
  selector: 'app-reference-type',
  templateUrl: './reference-type.component.html',
  styleUrls: ['./reference-type.component.scss']
})
export class ReferenceTypeComponent {

  types: string[] = [];

  constructor(public loader: LoadingService, private referenceService: ReferenceService,
    private httpUtilityService: HttpUtilityService) {
  }
  ngOnInit(): void {

    if (this.types.length == 0) {
      this.getTypeList();
    }
  }

  private getTypeList() {
    this.referenceService.getReferenceTypeList()
      .subscribe({
        next: u => {
          this.types = u;
          if (this.types.length > 0){

          }
        },
        error: (error) => {
          this.httpUtilityService.errorHandler("Retrieve Reference Type List Failed", error);
        },
        complete: () => {
        }
      });
  }

  private setSelectedType(type:string){
    this.referenceService.setSelectedReferenceType(type) ;
  }

  changeSelection(e:any){
    this.setSelectedType(e.target?.value) ;
  }

}
