import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";

@Component({
    selector: "dashboard",
    styleUrls: ['./dashboard-base.component.scss'],
    templateUrl: './dashboard-base.component.html'
})
export class DashboardBaseComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private typicodeService: TypiCodeService,
        private authService: AuthService
    ) {

    }
    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
        
    }

    routeToLogin() {
        this.router.navigateByUrl("/login")
    }
}