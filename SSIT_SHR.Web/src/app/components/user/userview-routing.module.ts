import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewComponent } from './userview.component';


const routes: Routes = [
    { path: '', component: UserViewComponent },

];

@NgModule({
  imports: [  
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserViewRoutingModule{ }