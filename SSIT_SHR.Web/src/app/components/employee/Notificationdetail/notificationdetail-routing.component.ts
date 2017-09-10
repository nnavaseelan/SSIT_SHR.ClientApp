import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{NotificationdetailComponent} from './notificationdetail.component';

const routes: Routes = [
    { path: '', component:NotificationdetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationdetailRoutingModule { }
