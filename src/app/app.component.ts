import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

export enum TaskState {
  New,
  Done,
}

export interface Task {
  title: string;
  state: TaskState;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signals-course';

  tasks = signal<Task[]>([{
    title: 'Learn more about the signals',
    state: TaskState.New
  }]);

  readonly TaskState = TaskState;

  value = signal<number>(0);
  isPrime = computed<boolean>(() => this.isNumberPrime(this.value()));
  whenClickedAddOneNumberIsPrime = computed(() => this.isNumberPrime(this.value() + 1) ? `If you click add 1 button the number ${this.value() + 1} it will be prime.` : '');
  whenClickedMultiplyTwoNumberIsPrime = computed(() => this.isNumberPrime(this.value() + 1) ? `If you click multiply 2 button the number ${this.value() + 1} it will be prime.` : '');

  createNewTask() {
    const newTask: Task = {
      title: 'Learn more about the signals',
      state: TaskState.New,
    };
    this.tasks.update((tasks) => {
      tasks.push(newTask);
      return tasks;
    });
  }

  markAsDone(index: number) {
    this.tasks.update(tasks => {
      tasks[index].state = TaskState.Done;
      return tasks;
    });
  }

  reset() {
    this.value.set(0);
  }

  add() {
    this.value.update((currentValue) => currentValue + 1);
  }

  multiply() {
    this.value.update((currentValue) => currentValue * 2);
  }

  isNumberPrime(num: number): boolean {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }
}
