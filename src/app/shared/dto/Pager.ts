export interface Pager {
    content: any[];
    sort:PageableSort;
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Pageable {
    sort:PageableSort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
}

export interface PageableSort {
    sorted: boolean;
    sortField: string;
    sortDesc:boolean;
}

export interface PageFilter{
    active:boolean ;
    fieldName: string;
    fieldType: string;
    fieldValue: string;
    fromValue: number;
    toValue:number;
    displayName:string;
    optionalList:string;
}