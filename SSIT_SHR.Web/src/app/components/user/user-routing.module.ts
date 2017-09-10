import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Usercomponent } from './user.component';
import{ AdduserComponent} from './adduser.component';

const routes: Routes = [
    { path: '', component: Usercomponent },
    // { path:'/adduser'  ,component:AdduserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
