import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  sub: Subscription = new Subscription();

  user: any = {};
  userId: any = '';
  display: boolean = false;

  constructor(
    private avr: ActivatedRoute,
    private srv: UtilsService,
    private router: Router
  ) {}

  delete(value: any) {
    let postId = this.user.posts.find((post: any) => post._id == value);

    let index = this.user.posts.indexOf(postId);

    if (postId) {
      this.user.posts.splice(index, 1);

      this.srv.updateUser(this.userId, this.user).subscribe(() => {
        
      });
    }
  }

  addPost() {
    this.display = true;
    sessionStorage['id'] = this.userId;
  }

  showPosts(showPosts: any) {
    this.display = showPosts;
    this.display = !this.display;
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
