import { Component, OnInit } from '@angular/core';
import {Elemento, SegundoElemento} from '../elemento';
import { TodoListService } from '../todo-list.service';
import { TodoListStorageService } from '../todo-list-storage.service';

const defaultList = [
  { title: 'install NodeJS' },
  { title: 'install Angular CLI' },
  { title: 'create new app' },
  { title: 'serve app' },
  { title: 'develop app' },
  { title: 'deploy app' },
];
@Component({
  selector: 'todo-list-manager',
  template: `
  <div class="todo-app">
    <h1>
      {{title}}
    </h1>
    <todo-input (submit)="addItem($event)" ></todo-input>
    <ul>
      <li *ngFor="let todoItem of todoList">
        <todo-item [item]="todoItem"></todo-item>
      </li>
    </ul>
  </div>

  `,
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {
  title = 'Lista de Pasos para hacer un proyecto con Angular';
  esMartes = false;
  valorFinal = 1;
  rojo = 'blue';
  todoList: Array<Elemento> = [] ;
  excede = this.todoList.length > 0;
  constructor(private todoListService: TodoListService,
              private todoListStorageService: TodoListStorageService) {


   }

  ngOnInit() {
    this.todoList = this.todoListStorageService.get();
  }



  cambiarRojo() {
    return 'red';
  }
  cambiarColor() {
    if (this.valorFinal === 1) {
      this.valorFinal = 0;
    } else {
      this.valorFinal = 1;
    }
    return this.valorFinal;
  }
  agregaItem(): void {

    this.todoList.push(new Elemento(this.title, '') );
  }
  cambiarTitulo (event: any): void {
    console.log(event);
    this.title = event.target.value;

  }
  addItem(title: string): void {
    this.todoListStorageService.post(new Elemento(title, ''));
  }

}
