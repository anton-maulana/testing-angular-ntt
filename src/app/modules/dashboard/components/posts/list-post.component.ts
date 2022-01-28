import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationBehaviorOptions, Router } from "@angular/router";
import { Comment } from "@app/models/comment";
import { Post } from "@app/models/post";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";
import { forkJoin, Observable } from "rxjs";

@Component({
    selector: "list-post",
    styleUrls: ['./list-post.component.scss'],
    templateUrl: './list-post.component.html'
})
export class ListPostComponent implements OnInit, OnDestroy {
    listPosts: Post[] = [];
    isLoading: boolean = false;
    page: number = 1;
    perPage: number = 10;
    listCommentsByPostId: any = {};
    constructor(
        private router: Router,
        private typicodeService: TypiCodeService,
        private authService: AuthService
    ) {

    }
    ngOnInit(): void {
        this.isLoading = true;
        let posts$ = this.typicodeService.getPosts();
        let users$ = this.typicodeService.getUsers();
    
        forkJoin([posts$, users$])
          .subscribe(async ([posts, users]) => {
              posts.forEach(post => {
                  post.user = users?.find(e => post.userId == e.id)
              })
              
              this.listPosts = posts;
              await this.fetchComments(0, 10);
              this.isLoading = false;
          });
    }

    async fetchComments(start: number, end: number) {
        let selected = this.listPosts.slice(start, end);
        let toBeFetching: Observable<Comment[]>[] = [];
        selected.forEach( e => {
            toBeFetching.push(this.typicodeService.getCommentByPostId(e.id));
        })
        await forkJoin(toBeFetching).subscribe(data => {
            data.forEach(o => {
                if (!this.listCommentsByPostId.hasOwnProperty(o[0].postId)) {
                    this.listCommentsByPostId[o[0].postId] = o
                }
            })
        })
    }
    onPageChanged($event: any): void {
        this.page = $event;
        this.fetchComments(this.page - 1, this.page * this.perPage);
    }
    
    ngOnDestroy(): void {
        
    }

    openDetail(id: number) {
        let options: NavigationBehaviorOptions = {
            state: {comments: this.listCommentsByPostId[id], post: this.listPosts.find(e => e.id == id)}
        }
        console.log(options)
        this.router.navigateByUrl("/dashboard/post/"+id, options)
    }

    routeToLogin() {
        this.router.navigateByUrl("/login")
    }
}