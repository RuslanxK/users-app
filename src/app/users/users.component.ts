import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  sub: Subscription = new Subscription();
  users: User[] = [];
  filteredData: User[] = [];
  

  constructor(private srv: UtilsService, private router: Router) {}

  addUser() {
    this.router.navigate(['add']);
  }

  search(userData: string) {
    this.filteredData = this.users.filter(
      (x) =>
        x.name.toLowerCase().startsWith(userData) ||
        x.email.toLowerCase().startsWith(userData)
    );
  }

  ngOnInit(): void {
    this.sub = this.srv.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.filteredData = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
  }
}
