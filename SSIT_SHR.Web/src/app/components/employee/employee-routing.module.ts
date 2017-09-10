import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Employeecomponent } from './employee-list/employee.component';
import { EmployeeDetail } from './employee-detail/employee-detail.component';
 
const routes: Routes = [
    { path: '', component:Employeecomponent },
    { path: 'employee-detail/:id/:name', component:EmployeeDetail } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }