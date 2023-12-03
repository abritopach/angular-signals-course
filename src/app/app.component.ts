import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signals-course';
  value = signal(15);
  counter = signal(0);

  constructor(){
    setTimeout(() => {
      // Replacing the initial value of 15 with 30 after 1000ms.
        this.value.set(30);
    }, 1000);

    setInterval(() => {
      // Increment the value by one, every 1000ms.
      this.value.update(v => v + 1);
    }, 2000);
  }

  reset() {
    this.counter.set(0);
  }

  add() {
    this.counter.update(c => c + 1);
  }

  multiply() {
    this.counter.update(c => c * 2);
  }
}
