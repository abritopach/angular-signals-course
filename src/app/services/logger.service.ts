import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: string[] = [];

  log(value: number) {
    this.logs.push(`${new Date().toLocaleTimeString()}: log  ${value}`);
  }

  getLogs() {
    return this.logs;
  }
}
