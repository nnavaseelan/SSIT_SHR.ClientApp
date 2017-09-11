import { NgModule,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Ng2TableModule } from 'ng2-table';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule,NgbPaginationModule,NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';
import { ApprovalRoutingModule } from './approval-routing.module';
import { Approvalcomponent } from './approval.component';
import {Approvalservice} from './approval.service';
import {Paymentrequestcomponent} from './paymentrequest/paymentrequest.component';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),FormsModule,
        ReactiveFormsModule,
        ApprovalRoutingModule,
       NgbPaginationModule,Ng2TableModule
       
    ],
    declarations: [
       Approvalcomponent,Paymentrequestcomponent
    ],
    providers:[NgbPaginationConfig,Approvalservice,DatePipe,],
     schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class ApprovalModule { }
