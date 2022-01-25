import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgxPaginationModule } from "ngx-pagination";
import { DashboardBaseComponent } from "./components/base/dashboard-base.component";
import { ListPostComponent } from "./components/posts/list-post.component";
import { DashboardRoutingModule } from "./dashboard.routing";

@NgModule({
    declarations: [
        DashboardBaseComponent,
        ListPostComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ],
    exports: [
    ],
    providers: []
})
export class DashboardModule { }