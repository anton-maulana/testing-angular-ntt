import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guard/auth.guard';
import { DashboardBaseComponent } from './components/base/dashboard-base.component';
import { DetailPostComponent } from './components/posts/detail-post.component';
import { ListPostComponent } from './components/posts/list-post.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: DashboardBaseComponent, 
        children: [
            {path: '', component: ListPostComponent},
            {path: 'post/:id', component: DetailPostComponent},
            {path: 'profile', component: ProfileComponent}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
