import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css'],
})
export class AddtaskComponent implements OnInit {
  sub: Subscription = new Subscription();

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
  hideTasks: boolean = false;
  task: any = { title: '', completed: false };
  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  buttonType: string = '';

  constructor(private srv: UtilsService, private avr: ActivatedRoute, private router: Router) {}

  submit(buttonType: string) {
    if (buttonType == 'back') {
      this.hideTasks = true;
      this.notify.emit(this.hideTasks);
    } else if (buttonType == 'addTask') {
      let tasks = this.user.tasks;

      if (this.task.title.length) {
        tasks.push(this.task);

        this.srv.updateUser(this.userId, this.user).subscribe(() => {

        });

       
      } else {
        alert('Title Missing');
      }
    }
  }

  ngOnInit(): void {
    this.userId = sessionStorage['id'];

    this.sub = this.srv
      .getUser(this.userId)
      .subscribe((data: any) => (this.user = data));
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
