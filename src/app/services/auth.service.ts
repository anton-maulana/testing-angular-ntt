import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import urlJoin from 'proper-url-join';
import { HttpClientRequestHelper as RequestHelper } from '@app/helpers/httpclient-request';
import { Query } from "@app/models/query";
import { User } from "@app/models/user";
import { Post } from "@app/models/post";
import { CookieService } from "ngx-cookie-service";
import { CookieNames } from "@app/constants/cookie-names.constant";

@Injectable()
export class AuthService {
    constructor(
        private cookieService: CookieService,
    ) {
    }

    setUser(newUser?: User): void {
        let strObj =  JSON.stringify(newUser);
        console.log(strObj)
        this.cookieService.set(CookieNames.CURRENT_USER, JSON.stringify(newUser));
    }

    getCurrentUser(): User | null {
        let res = null;
        let val = this.cookieService.get(CookieNames.CURRENT_USER);
        try {
            let user: User = JSON.parse(val);
            res = user;
        } catch(e) {
            console.error("invalid value")
        }
        return res;
    }

    hasLogedIn(): boolean {
        let value = this.getCurrentUser();
        return Boolean(value && value.id)
    }

    deleteCurrentUser(): void {
        this.cookieService.delete(CookieNames.CURRENT_USER);
    }
}