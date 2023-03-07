import { Injectable } from '@angular/core';
import { ItemDTO } from '../models/ItemDTO';

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {

  
  constructor() {}

  mapToJson(list:ItemDTO[]): any{
    return JSON.stringify(list);
  }
  
}
