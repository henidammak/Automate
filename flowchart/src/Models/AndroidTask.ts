import { BaseTask } from './BaseTask';

export class AndroidTask implements BaseTask {
  id: string;

  constructor(id: string) {
    this.id = id;

  }
}