import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  sub: Subscription = new Subscription();
  user: any = {};
  userId: string = '';
  hideTodos: boolean = false;

  constructor(
    private avr: ActivatedRoute,
    private srv: UtilsService,
    private router: Router
  ) {}

  delete(value: any) {
    let todoId = this.user.tasks.find((task: any) => task._id == value);

    let index = this.user.tasks.indexOf(todoId);

    if (todoId) {
      this.user.tasks.splice(index, 1);

      this.srv.updateUser(this.userId, this.user).subscribe(() => {
     
      });
    }
  }

  addTask() {
    this.hideTodos = true;
    sessionStorage['id'] = this.userId;
  }

  showTodos(showTodos: any) {
    this.hideTodos = showTodos;
    this.hideTodos = !this.hideTodos;
  }

  ngOnInit(): void {
    this.avr.params.subscribe((data) => {
      this.userId = data['id'];

      this.sub = this.srv.getUser(this.userId).subscribe((data: any) => {
        this.user = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
