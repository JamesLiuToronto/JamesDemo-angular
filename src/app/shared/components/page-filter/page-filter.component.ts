
import { Component, Input } from '@angular/core';
import { PageService } from '../../service/page.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PageFilter } from '../../dto/Pager';

@Component({
  selector: 'app-page-filter',
  standalone: true,
  templateUrl: './page-filter.component.html',
  styleUrls: ['./page-filter.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})

export class PageFilterComponent {

  @Input ('filters') filterSelections:PageFilter[] | undefined ;
  filterField = this.pageService.getInitPageFilter();
  filterForm!: FormGroup;
  optionalList:string[]|undefined ;

  constructor(private fb: FormBuilder, private pageService: PageService){
    this.filterSelections?.push(this.pageService.getInitPageFilter()) ;
    
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
    this.filterField = this.pageService.getFilterByName(selectedFilterName, this.filterSelections!);
    console.log("filter change=" + this.filterField.displayName) ;
  }

  public onSelectedStatus(event: any) {
    this.filterForm.get('filterString')?.setValue(event.target.value) ;
  }

    
  public getFilterType(){
    console.log("filter type get=" + this.filterField.displayName) ;
  
    if (this.filterField.fieldName=='NA'){
      return 'NA' ;
    }
    return this.filterField.fieldType ;
  }

  onSubmit(form: FormGroup) {
    //this.filterField.fieldValue = form.get('filterString')?.value ;
    // console.log("filter string=" + form.get('filterString')?.value) ;
    // console.log("filter boolean=" + form.get('filterBoolean')?.value) ;
    // console.log("filter from=" + form.get('filterFrom')?.value) ;
    // console.log("filter to=" + form.get('filterTo')?.value) ;

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

    this.pageService.filterChangeEvent.emit(this.filterField!);
  
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
