import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@app/models/user";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";

@Component({
    selector: "dashboard",
    styleUrls: ['./dashboard-base.component.scss'],
    templateUrl: './dashboard-base.component.html'
})
export class DashboardBaseComponent implements OnInit, OnDestroy {
    currentUser: User | null | undefined;
    constructor(
        private router: Router,
        private typicodeService: TypiCodeService,
        private authService: AuthService
    ) {

    }
    ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
    }
    
    ngOnDestroy(): void {
        
    }

    logout() {
        this.authService.deleteCurrentUser();
        this.router.navigateByUrl("/")
    }

    routeToLogin() {
        this.router.navigateByUrl("/login")
    }
}