import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import urlJoin from 'proper-url-join';
import { HttpClientRequestHelper as RequestHelper } from '@app/helpers/httpclient-request';
import { Query } from "@app/models/query";
import { User } from "@app/models/user";
import { Post } from "@app/models/post";

@Injectable()
export class TypiCodeService {
    private __baseUrl: string;
    constructor(
        private httpClient: HttpClient
    ) {
        this.__baseUrl = "https://jsonplaceholder.typicode.com/";
    }

    public getUsers(query?: Query) {
        let request = RequestHelper.getRequest(
            null,
            query,
            false
        )
        return this.httpClient.request<User[]>('GET', urlJoin(this.__baseUrl, 'users'), request);
    }

    public getPosts(query?: Query) {
        let request = RequestHelper.getRequest(
            null,
            query,
            false
        )
        return this.httpClient.request<Post[]>('GET', urlJoin(this.__baseUrl, 'posts'), request);
    }

    public getCommentByPostId({ query, postId }: { query?: Query; postId: number; }) {
        let request = RequestHelper.getRequest(
            null,
            query,
            false
        )
        return this.httpClient.request<Post[]>('GET', urlJoin(this.__baseUrl, 'posts', postId, 'comments'), request);
    }
}