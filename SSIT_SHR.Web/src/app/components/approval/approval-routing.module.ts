import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Approvalcomponent} from './approval.component';
import{Paymentrequestcomponent} from './paymentrequest/paymentrequest.component';


const routes: Routes = [
    { path: '', component: Approvalcomponent },
    // { path:'/adduser'  ,component:AdduserComponent}
    { path: 'paymentrequest', component:Paymentrequestcomponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalRoutingModule { }
