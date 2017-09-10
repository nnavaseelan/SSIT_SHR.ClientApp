import { NgModule,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {
    NgbCarouselModule,
    NgbAlertModule,NgbPaginationModule,NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';
import { UserRoutingModule } from './user-routing.module';
import { Usercomponent } from './user.component';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
       NgbPaginationModule,Ng2TableModule
       
    ],
    declarations: [
       Usercomponent
    ],
    providers:[NgbPaginationConfig],
     schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class UserModule { }
