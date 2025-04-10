import { BaseTask } from './BaseTask';

export class CmdStage implements BaseTask {
  id: string;
  title: string;
  cmd_text: string;
  root: number;

  constructor(id: string, title: string, cmd_text: string, root: number) {
    this.id = id;
    this.title = title;
    this.cmd_text = cmd_text;
    this.root = root;
  }
}

