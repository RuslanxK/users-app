import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  sub: Subscription = new Subscription();

  @Input()
  task: any = {};
  userId: any = '';
  user: User = {
    _id: '',
    name: '',
    email: '',
    street: '',
    city: '',
    zipcode: 0,
    tasks: [],
    posts: [],
  };
  completed: boolean = false;
  deleteTask: boolean = false;

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private srv: UtilsService,
    private avr: ActivatedRoute,
    private router: Router
  ) {}

  sendToParent() {
    this.deleteTask = !this.deleteTask;
    this.notify.emit(this.task._id);
  }

  markCompleted() {
    this.task.completed = !this.task.completed;
    this.completed = !this.completed;

    this.user.tasks.forEach((task: any) => {
      if (this.task._id == task._id) {
        task.completed = this.task.completed;
      }
    });

    this.srv.updateUser(this.userId, this.user).subscribe(() => {
    
    });
  }

  ngOnInit(): void {
    if (this.task.completed === this.completed) {
      this.completed = true;
    } else {
      this.completed = false;
    }

    this.avr.params.subscribe((data) => {
      this.userId = data['id'];

      this.sub = this.srv
        .getUser(this.userId)
        .subscribe((data: any) => (this.user = data));
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
