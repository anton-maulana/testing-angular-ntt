import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "@app/models/post";
import { Location } from '@angular/common'

@Component({
    selector: "list-post",
    styleUrls: ['./detail-post.component.scss'],
    templateUrl: './detail-post.component.html'
})
export class DetailPostComponent implements OnInit, OnDestroy {

    constructor(
        private router: Router,
        private location: Location
    ) {

    }
    ngOnInit(): void {
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