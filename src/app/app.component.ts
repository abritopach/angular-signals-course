import { Component, signal } from '@angular/core';
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
}
