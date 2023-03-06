export class Todo {
  private title="";
  private completed=false;
  private editMode = false;
  constructor(title:string){
    this.title = title || '';
  }
  get done():boolean{
    return this.completed;
  }
  getTitle():string{
    return this.title;
  }
  setTitle(title:string){
    this.title = title;
  }
  toggleCompletion():void{
    this.completed = !this.completed;
  }
  get editing():Boolean{
    return this.editMode;
  }
  set editable(bl:boolean){
    this.editMode = bl;
  }
  setCompleted(completed:boolean){
    this.completed = completed;
  }
}
