import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor() { }
  public projectname = "James OutDemo";
  public serverurl = "url";
}
