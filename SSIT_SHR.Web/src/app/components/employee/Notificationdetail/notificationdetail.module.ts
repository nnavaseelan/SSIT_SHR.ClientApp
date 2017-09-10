import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import{NotificationdetailComponent} from './notificationdetail.component';
import{NotificationdetailRoutingModule} from './notificationdetail-routing.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,NotificationdetailRoutingModule,
      
    ],    
    declarations: [
       NotificationdetailComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],

    
})
export class NotificationdetailModule { }
