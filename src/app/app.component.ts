import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { newPost, Post } from '../app/models/post.model';
import { PostService } from './services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  postSubs: Subscription;
  allposts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postSubs = this.postService.getAllPost().subscribe((post) => {
      this.allposts = post;
    });
  }

  addPost() {
    let post = { ...newPost };
    Swal.fire({
      title: 'New Post',
      html: `<input type="text" id="title" class="swal2-input" placeholder="Title">
      <textarea type="text" id="body" class="swal2-input" style="min-height: 150px;" placeholder="Body text">`,
      confirmButtonText: 'Add post',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = Swal.getPopup().querySelector('#title')['value'];
        const body = Swal.getPopup().querySelector('#body')['value'];
        if (!title || !body) {
          Swal.showValidationMessage(`All fields are required`);
        }
        return { title: title, body: body };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        post.title = result.value.title;
        post.body = result.value.body;
        this.postService.newPost(post).then(() => {
          Swal.fire(
            'Add Post',
            'The post has been added successfully',
            'success'
          );
        });
      }
    });
  }

  trackByFn(index, item) {
    return index;
  }

  ngOnDestroy(): void {
    if (this.postSubs) {
      this.postSubs.unsubscribe();
    }
  }
}
