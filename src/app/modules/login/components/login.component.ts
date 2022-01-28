import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Login as LoginModel } from "@app/models/login";
import { User } from "@app/models/user";
import { AuthService } from "@app/services/auth.service";
import { TypiCodeService } from "@app/services/typicode.service";
import { CookieService } from "ngx-cookie-service";
import { TypedFormGroup } from "ngx-forms-typed";
import { find, map } from "rxjs/operators";

@Component({
    selector: "login",
    styleUrls: ['./login.component.scss'],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: TypedFormGroup<LoginModel>;
    users: User[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private typicodeService: TypiCodeService,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.createLoginForm(this.formBuilder);
    }
    ngOnInit(): void {
        this.typicodeService.getUsers().subscribe( res => {
            if (res) {
                this.authService.setUserAllUsers(res);
                this.users = res;
            }
        })
    }
    createLoginForm(formBuilder: FormBuilder): TypedFormGroup<LoginModel> {
        let form = formBuilder.group({
          username: [null, [Validators.required]],
          password: [null, [Validators.required]],
        }) as TypedFormGroup<LoginModel>;
    
        return form;
    }

    login() {
        if (this.loginForm?.invalid)
            return;
        
        let user = this.users.
            find(e => e.username.toLowerCase() === this.loginForm.value.username.toLowerCase());
        if (user) {
            this.authService.setUser(user);
            this.router.navigateByUrl("/dashboard");
        } else {
            alert(`User ${this.loginForm.value.username} not found.`)
        }
    }
    
    ngOnDestroy(): void {
        
    }
}