import { Component } from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-logger',
  standalone: true,
  imports: [],
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.css'
})
export class LoggerComponent {

  constructor(public loggerService: LoggerService) {}

}
