import { AndroidTask } from "./AndroidTask";


export class Intent_Task implements AndroidTask {
  id: string;
  title: string;
  Action: string;
  PackageName: string;
  ClassName: string;
  Data: string;
  ActionType: string;

  constructor(
    id: string,
    title: string,
    Action: string,
    PackageName: string,
    ClassName: string,
    Data: string,
    ActionType: string
  ) {
    this.id = id;
    this.title = title;
    this.Action = Action;
    this.PackageName = PackageName;
    this.ClassName = ClassName;
    this.Data = Data;
    this.ActionType = ActionType;
  }
}
