import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule} from './employee-routing.module';
import { Employeecomponent} from './employee-list/employee.component';
import { EmployeeDetail } from './employee-detail/employee-detail.component';
import { EmployeeService } from './employee.service';
import { NgbModule , NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule} from "angular2-datatable";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EmployeeRoutingModule,
        NgbModule,
        DataTableModule
    ],    
    declarations: [
       Employeecomponent,
       EmployeeDetail
    ],
    providers:[EmployeeService,NgbTabsetConfig]

    
})
export class EmployeeModule { }
