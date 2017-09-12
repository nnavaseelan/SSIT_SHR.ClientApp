import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { Employeecomponent } from './employee-list/employee.component';
import { EmployeeDetail } from './employee-detail/employee-detail.component';
import { EmployeeAddComponent } from "app/components/employee/employee-add/employee-add.component";
import { EmployeeMasterComponent } from "app/components/employee/employee-master/employee-master.component";

const routes: Routes = [
    { path: '', component:Employeecomponent },
    { path: 'employee-detail/:id/:name', component:EmployeeDetail }, 
    { path: 'employeeadd', component:EmployeeAddComponent } ,
    { path: 'employeemaster', component: EmployeeMasterComponent } 
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }