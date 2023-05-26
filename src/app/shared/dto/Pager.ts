export interface Pager {
    content: string;
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: string;
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
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}