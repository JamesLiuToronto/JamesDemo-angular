
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageFilter } from '../../dto/Pager';
import { PageFilterService } from '../../service/pageFilter.service';

@Component({
  selector: 'app-page-filter',
  standalone: true,
  templateUrl: './page-filter.component.html',
  styleUrls: ['./page-filter.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class PageFilterComponent {

  @Input ('filters') filterSelections:PageFilter[] | undefined ;
  filterField = this.pageFilterService.getInitPageFilter();
  filterForm!: FormGroup;
  optionalList:string[]|undefined ;

  constructor(private fb: FormBuilder, private pageFilterService: PageFilterService){
    this.filterSelections?.push(this.pageFilterService.getInitPageFilter()) ;
    
  }
  
  
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      filterString: [''],
      filterBoolean: [''],
      filterFrom: [0],
      filterTo: [0],

    });  
  }

  public onChangeFilterField(event: any) {
    let selectedFilterName = event.target.value;
    this.filterField = this.pageFilterService.getFilterByName(selectedFilterName, this.filterSelections!);
  }

  public onSelectedStatus(event: any) {
    this.filterForm.get('filterString')?.setValue(event.target.value) ;
  }

    
  public getFilterType(){
  
    if (this.filterField.fieldName=='NA'){
      return 'NA' ;
    }
    return this.filterField.fieldType ;
  }

  onSubmit(form: FormGroup) {
   
    if (!this.isFilterEnable()){
      return ;
    }
    if (this.isFilterString1()){
      this.filterField.fieldValue = form.get('filterString')?.value;
    }

    if (this.isFilterBoolean()){
      this.filterField.fieldValue = form.get('filterBoolean')?.value;
    }

    if (this.isFilterNumber()){
      this.filterField.fromValue = form.get('filterFrom')?.value;
      this.filterField.toValue = form.get('filterTo')?.value;
    }

    this.pageFilterService.filterChangeEvent.emit(this.filterField!);
  
  }

  isFilterEnable(){
    return !(this.filterField.fieldName=='NA');
  }

  isFilterString1(){
    return this.isFilterEnable()&&(this.filterField.fieldType=='string') ;
  }
  isFilterStringWithoutList(){
    return this.isFilterEnable()&&(this.filterField.fieldType=='string')&&(this.filterField.optionalList=='NA');
  }

  isFilterStringWithList(){
    if (!(this.isFilterEnable()&&(this.filterField.fieldType=='string')&&(!(this.filterField.optionalList=='NA')))) {
      return false ;
    }
    this.optionalList = this.filterField.optionalList.split(',') ;
    if ((this.filterField.fieldValue==null)||(this.filterField.fieldValue.trim().length ==0)){
      this.filterForm.get('filterString')?.setValue(this.optionalList[0]) ;
    }
    return true ;
  }

  isFilterBoolean(){
    return this.isFilterEnable()&&(this.filterField.fieldType=='boolean');
  }

  isFilterNumber(){
    return this.isFilterEnable()&&(this.filterField.fieldType=='number');
  }




}
