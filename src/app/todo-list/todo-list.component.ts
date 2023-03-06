import { Component } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  todoStatusType = TodoStatusType;
  private status = TodoStatusType.All;
  constructor(private todoListService:TodoListService){}

  addTodo(event:KeyboardEvent ):void{
    const todoThing = event.target as HTMLInputElement;
    if(!todoThing)
    {
      return;
    }
    if(event.key === 'Enter'){
      const todo = todoThing.value.trim();
      if(todo){
        this.todoListService.add(todo);
        todoThing.value='';
      }
    }
  }
  edit(todo:Todo){
    todo.editable = true;
  }
  cancelEditing(todo:Todo){
    todo.editable = false;
  }
  update(todo:Todo,newTitle:string){
    if(!todo.editing){
      return;
    }
    const title = newTitle.trim();
    if(title){
      todo.setTitle(title);
      todo.editable = false;
    }else{
      const index = this.getList().indexOf(todo);
      if(index !== -1){
        this.removeTodo(index);
      }
    }
  }
  getList():Todo[]{
    let list:Todo[] = [];
    switch(this.status){
      case TodoStatusType.Active:
        list = this.getRemainingList();
        break;
      case TodoStatusType.Completed:
        list = this.getCompletedList();
        break;
      default:
        list = this.todoListService.getList();
        break;
    }
    return list;
  }
  removeTodo(num:number):void{
    this.todoListService.remove(num)
  }
  getRemainingList():Todo[]{
    return this.todoListService.getWithCompleted(false)
  }
  getCompletedList():Todo[]{
    return this.todoListService.getWithCompleted(true);
  }
  setStatus(status:number){
    this.status = status;
  }
  checkStatus(status:number):boolean{
    return this.status === status;
  }
  removeCompleted(){
    this.todoListService.removeCompleted();
  }
  getAllList():Todo[]{
    return this.todoListService.getList();
  }
  allCompleted():boolean{
    return this.getAllList().length === this.getCompletedList.length;
  }
  setAllTo(completed:boolean){
    this.getAllList().forEach((todo) =>{
      todo.setCompleted(completed);
    })
  }
}
