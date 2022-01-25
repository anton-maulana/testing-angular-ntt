import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login.component";
import { LoginRoutingModule } from "./login.routing";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
    ],
    providers: []
})
export class LoginModule { }