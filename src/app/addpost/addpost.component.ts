import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
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
  hidePosts: boolean = false;
  post: any = { title: '', body: '' };
  buttonType: string = '';

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private srv: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submit(buttonType: string) {
    if (buttonType == 'back') {
      this.hidePosts = true;
      this.notify.emit(this.hidePosts);
    } else if (buttonType == 'addPost') {
      let posts = this.user.posts;

      if (this.post.title.length && this.post.body.length) {
        posts.push(this.post);
        this.srv.updateUser(this.userId, this.user).subscribe(() => {
        
        });
      } else {
        alert('Title or Body Missing');
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
