import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  sub: Subscription = new Subscription();

  deletePost: boolean = false;

  @Output()
  notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  post: any = {};

  constructor() {}

  sendToParent() {
    this.deletePost = !this.deletePost;
    this.notify.emit(this.post._id);
  }

  ngOnInit(): void {

  }
}
