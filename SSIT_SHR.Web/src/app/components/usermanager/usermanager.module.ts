import { NgModule,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2TableModule } from 'ng2-table';

 
import {
    NgbCarouselModule,
    NgbAlertModule,NgbPaginationModule,NgbPaginationConfig
} from '@ng-bootstrap/ng-bootstrap';


import { UserManagerRoutingModule } from './usermanager-routing.module';
import {UsermanagerComponent} from './usermanager.component';


@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        UserManagerRoutingModule,
       NgbPaginationModule,Ng2TableModule
       
    ],
    declarations: [
       UsermanagerComponent
    ],
    providers:[NgbPaginationConfig],
     schemas: [ CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA ]
})
export class UserManagerModule { }
