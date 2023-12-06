import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  doneOperations: number = 0;

  constructor() { }

  markedAsDone() {
    return this.doneOperations++;
  }

}
