import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  displayDiv: boolean = false;

  sub: Subscription = new Subscription();

  newUser: User = {
    _id: '',
    name: '',
    email: '',
    street: '',
    city: '',
    zipcode: 0,
    tasks: [],
    posts: [],
  };

  userRequiredMessage: boolean = false;

  constructor(private srv: UtilsService, private router: Router, private route: ActivatedRoute) {}

  submit() {

    if (this.newUser.name && this.newUser.email) {
      this.sub = this.srv.addUser(this.newUser).subscribe(() => {

     
      });
      
    } else {
      this.userRequiredMessage = true;
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
