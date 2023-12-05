import { Component, EffectRef, Injector, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { v4 as uuid } from 'uuid';
import { LoggerService } from './services/logger.service';
import { LoggerComponent } from './components/logger/logger.component';

export enum TaskState {
  New,
  Done,
}

export interface Task {
  _id: string,
  title: string;
  state: TaskState;
}

const INITIAL_TASKS: Task[] = [
  {
    _id: uuid(),
    title: 'Learn about the signals',
    state: TaskState.New,
  },
  {
    _id: uuid(),
    title: 'Learn even more about the signals',
    state: TaskState.New,
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoggerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signals-course';

  tasks = signal<Task[]>(INITIAL_TASKS);

  readonly TaskState = TaskState;

  // To-do List
  tasksDone = computed<Task[]>(() => this.tasks().filter(task => task.state === TaskState.Done));
  tasksNew = computed<Task[]>(() => this.tasks().filter(task => task.state === TaskState.New));

  // Counter
  value = signal<number>(0);
  isPrime = computed<boolean>(() => this.isNumberPrime(this.value()));
  whenClickedAddOneNumberIsPrime = computed(() => this.isNumberPrime(this.value() + 1) ? `If you click add 1 button the number ${this.value() + 1} it will be prime.` : '');
  whenClickedMultiplyTwoNumberIsPrime = computed(() => this.isNumberPrime(this.value() + 1) ? `If you click multiply 2 button the number ${this.value() + 1} it will be prime.` : '');

  myEffect: EffectRef | null = null;

  constructor(private logger: LoggerService, private injector: Injector) {}


  createNewTask() {
    const NEW_TASK: Task = {
      _id: uuid(),
      title: 'Learn even more about the signals',
      state: TaskState.New,
    };
    this.tasks.update((tasks) => [...tasks, NEW_TASK]);
  }

  markAsDone(done: Task) {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task._id === done._id) {
          return { ...task, state: TaskState.Done };
        }
        else {
          return task;
        }
      })
    });
  }

  startLogging() {
    // this.myEffect = effect(() => this.logger.log(this.value()), { injector: this.injector });

    this.myEffect = effect((onCleanup) => {
      const value = this.value();
      const task = setTimeout(() => {
        this.logger.log(value);
      }, 500);
      onCleanup(() => {
        clearTimeout(task);
      });
    }, { injector: this.injector });
  }

  stopLogging() {
    this.myEffect?.destroy();
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
