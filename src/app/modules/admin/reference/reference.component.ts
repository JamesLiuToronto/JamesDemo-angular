import { Component } from '@angular/core';
import { HttpUtilityService } from 'src/app/shared/service/http-utility.service';
import { Reference } from '../model/Reference';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { ReferenceService } from '../services/reference.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.scss']
})
export class ReferenceComponent {

  references: Reference[] = [];
  lastRetrieveTime: Date | undefined;
  loading$ = this.loader.loading$;
  title: string = "Retrieve Reference List";

  sortField: string = 'code';
  sortOrder = 1;


  constructor(public loader: LoadingService, private referenceService: ReferenceService,
    private router: Router, private httpUtilityService: HttpUtilityService) {
  }
  ngOnInit(): void {


    this.referenceService.showTypeSelectionChangedEvent
      .subscribe(
        (type: string) => {
          this.getReferences(type);
        }
      );
    
  }

  getReferences(type:string) {
    if (this.isValidTypeSelected(type)) {
      this.getAllReferences(type);
    }
  }

  private getAllReferences(type:string) {
    this.referenceService.getReferenceList(type, this.sortField, this.sortOrder)
      .subscribe({
        next: u => {
          this.references = u;
         
          this.lastRetrieveTime = new Date();
        },
        error: (error) => {
          this.httpUtilityService.errorHandler("Retrieve Reference List Failed", error);
        },
        complete: () => {
          
        }
      });
  }


  viewReference(index: number) {
    this.referenceService.setSelectedReference(this.references[index]);
    this.router.navigateByUrl('/admin/Reference');
  }


  sortBy(field: string) {
    if (this.references.length <= 1) return;
    this.sortOrder = field === this.sortField ? (this.sortOrder * -1) : 1;
    this.sortField = field;
    this.getReferences(this.referenceService.getSelectedReferenceType());
  }

  sortIcon(field: string) {
    if (this.references.length <= 1) return;
    if (field === this.sortField) {
      return this.sortOrder === -1 ? '☝️' : '👇';
    }
    return '';
  }

  isValidTypeSelected(type:string) {
    if ((type.length == 0) || (type == "NA")) {
      return false;
    } else {
      return true;
    }
  }

  isReferenceDisplay() {
    return this.isValidTypeSelected(this.referenceService.getSelectedReferenceType()) ;
  }


}
