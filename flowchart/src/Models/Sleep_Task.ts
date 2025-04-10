import { AndroidTask } from './AndroidTask';


export class Sleep_Task implements AndroidTask {
  id: string;
  title: string;
  Time_sleep: number;

  constructor(id: string, title: string, Time_sleep: number) {
    this.id = id;
    this.title = title;
    this.Time_sleep = Time_sleep;
  }

}

