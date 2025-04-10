import { Pipeline } from './Pipeline';

export class BaseTask implements Pipeline {
  id: string;

  constructor(id: string) {
    this.id = id;

  }
}

