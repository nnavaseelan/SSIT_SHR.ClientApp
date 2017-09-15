import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule} from './employee-routing.module';
import { Employeecomponent} from './employee-list/employee.component';
import { EmployeeDetail } from './employee-detail/employee-detail.component';
import { EmployeeService } from './employee.service';
import { NgbModule , NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule} from "angular2-datatable";
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmpWizardComponent } from './emp-wizard/emp-wizard.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { EmpTabsComponent } from './emp-tabs/emp-tabs.component';

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
       EmployeeDetail,
       EmployeeAddComponent,
       EmpWizardComponent,
       EmployeeMasterComponent,
       EmpTabsComponent
    ],
    providers:[EmployeeService,NgbTabsetConfig]

    
})
export class EmployeeModule { }
