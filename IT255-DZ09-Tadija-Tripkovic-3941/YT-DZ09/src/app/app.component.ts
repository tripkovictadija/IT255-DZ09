import { Component } from '@angular/core';
import { PostService } from './service/post.service';
import { Post } from './module/post';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IT255-DZ09';
  lnth = 15;
  i = 0;
  channel = 'UCYd42uqEFBlXl-THI-QtDUQ';

  public postForm: FormGroup;

  public posts: Post[] = [];
  
  constructor(private _postService: PostService) {
    this._postService.getPosts(this.channel, this.lnth).subscribe((data: any) => {
      for (this.i; this.i < this.lnth; this.i++) {
        this.posts.push(new Post(data.items[this.i].snippet.title.slice(0, 70), data.items[this.i].snippet.description.slice(0, 70)));
      }
    })
    this.initForm();
  }
  public initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required
      ]),
      body: new FormControl('', [
        Validators.required
      ])
    });
  }
}
