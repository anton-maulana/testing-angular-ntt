import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "@app/models/post";
import { Location } from '@angular/common'
import { TypiCodeService } from "@app/services/typicode.service";
import { Comment } from "@app/models/comment";
import { forkJoin, mergeMap } from "rxjs";
import { User } from "@app/models/user";

@Component({
    selector: "list-post",
    styleUrls: ['./detail-post.component.scss'],
    templateUrl: './detail-post.component.html'
})
export class DetailPostComponent implements OnInit, OnDestroy {
    post: Post;
    comments: Comment[] = [];
    isLoading: boolean = false;
    showComments: boolean = false;
    constructor(
        private router: Router,
        private location: Location,
        private typicodeService: TypiCodeService,
        private route: ActivatedRoute,
    ) {
        this.post = this.router.getCurrentNavigation()?.extras.state?.["post"];
        this.comments = this.router.getCurrentNavigation()?.extras.state?.["comments"];
    }
    ngOnInit(): void {        
        this.route.params.subscribe(e => {
            let id = parseInt(e['id']);
            if (!this.post) {
                this.isLoading = true;
                this.typicodeService.getPostsById(id).pipe(
                    mergeMap((post) => {
                        this.post = post;
                        let posts$ = this.typicodeService.getUsersById(post.userId);
                        let comments$ = this.typicodeService.getCommentByPostId(post.id);   
                        return forkJoin([posts$, comments$]);
                    }),
                  ).subscribe(([user, comments]) => {
                      this.post['user'] =  user;
                      this.comments = comments;
                      this.isLoading = false;
                  });
            }
        });
        
    }
    
    ngOnDestroy(): void {
        
    }
    gotoPreviousPage() {
        this.location.back();
    }

    routeToLogin() {
        this.router.navigateByUrl("/login");
    }
}