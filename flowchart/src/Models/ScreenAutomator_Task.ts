import { BaseTask } from './BaseTask';


export class ScreenAutomator_Task implements BaseTask {
  id: string;
  title: string;
  Action_type:string
  GlobalAction_type:number
  ClickInText_textSelector:string
  ClickInText_CompareType:string
  ClickInText_Index:number
  ClickInText_text:string
  ClickInXY_X:number
  ClickInXY_Y:number
  LogScreen:number


  

  constructor(id: string, title: string,  Action_type:string,GlobalAction_type:number,ClickInText_textSelector:string,  ClickInText_CompareType:string,ClickInText_Index:number,ClickInText_text:string,ClickInXY_X:number,ClickInXY_Y:number,LogScreen:number) {
    this.id = id;
    this.title = title;
    this.Action_type=Action_type;
    this.GlobalAction_type=GlobalAction_type;
    this.ClickInText_textSelector=ClickInText_textSelector;
    this.ClickInText_CompareType=ClickInText_CompareType;
    this.ClickInText_Index=ClickInText_Index;
    this.ClickInText_text=ClickInText_text;
    this.ClickInXY_X=ClickInXY_X;
    this.ClickInXY_Y=ClickInXY_Y;
    this.LogScreen=LogScreen;
    
  }

}

