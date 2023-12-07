import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: string[] = [];

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()}: log  ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}
