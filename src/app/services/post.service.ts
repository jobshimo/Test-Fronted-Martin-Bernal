import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private db: AngularFirestore) {}

  getAllPost(): Observable<any[]> {
    return this.db
      .collection('posts', (ref) => {
        return ref.orderBy('createdDate', 'desc');
      })
      .valueChanges();
  }

  newPost(post: Post): Promise<any> {
    post.id = this.db.createId();
    return this.db.doc(`posts/${post.id}`).set(post);
  }
}
