import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/models/user";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";

@Component({
    selector: "dashboard",
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
    detailUser: User | undefined;
    constructor(
        private router: Router,
        private typicodeService: TypiCodeService,
        private authService: AuthService
    ) {

    }
    ngOnInit(): void {
        let user = this.authService.getCurrentUser();
        if (user?.id){
            this.typicodeService.getUsersById(user?.id).subscribe(res => {
                this.detailUser = res;
            })
        }
    }
    
    ngOnDestroy(): void {
        
    }
}