import { Pipeline } from './Pipeline';

export class Start_Task implements Pipeline {
  id: string;
  title: string;
  As_thread:number;
  Time_out:number;
  Sequential_exec:number;


  constructor(id: string, title: string,As_thread:number,Time_out:number,Sequential_exec:number) {
    this.id = id;
    this.title = title;
    this.As_thread=As_thread;
    this.Time_out=Time_out;
    this.Sequential_exec=Sequential_exec
  }
}
