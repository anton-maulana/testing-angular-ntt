import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "@app/models/post";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";
import { forkJoin } from "rxjs";

@Component({
    selector: "list-post",
    styleUrls: ['./list-post.component.scss'],
    templateUrl: './list-post.component.html'
})
export class ListPostComponent implements OnInit, OnDestroy {
    listPosts: Post[] = [];
    isLoading: boolean = false;
    page: number = 1;
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
          .subscribe(([posts, users]) => {
              posts.forEach(post => {
                  post.user = users?.find(e => post.userId == e.id)
              })
              this.isLoading = false;
              this.listPosts = posts;
              
          });
    }
    
    ngOnDestroy(): void {
        
    }

    openDetail(id: number) {
        this.router.navigateByUrl("/dashboard/post/"+id)
    }

    routeToLogin() {
        this.router.navigateByUrl("/login")
    }
}