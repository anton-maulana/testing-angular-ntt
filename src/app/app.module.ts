import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginModule } from './modules/login/login.module';
import { AuthService } from './services/auth.service';
import { TypiCodeService } from './services/typicode.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [
    TypiCodeService,
    CookieService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule
  ]
})
export class AppModule { }
