import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guard/auth.guard';
import { DashboardBaseComponent } from './components/base/dashboard-base.component';
import { DetailPostComponent } from './components/posts/detail-post.component';
import { ListPostComponent } from './components/posts/list-post.component';

export const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: DashboardBaseComponent, 
        children: [
            {path: '', component: ListPostComponent},
            {path: 'post/:id', component: DetailPostComponent}
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
