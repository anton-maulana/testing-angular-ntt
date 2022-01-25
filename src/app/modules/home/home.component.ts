import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";

@Component({
    selector: "login",
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        private typicodeService: TypiCodeService,
        private authService: AuthService
    ) {

    }
    ngOnInit(): void {
        if (this.authService.hasLogedIn()) {
            this.router.navigateByUrl('dashboard')
        }
    }
    
    ngOnDestroy(): void {
        
    }

    routeToLogin() {
        this.router.navigateByUrl("/login")
    }
}