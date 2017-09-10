import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdduserComponent} from './adduser.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import{AdduserRoutingModule} from './adduser.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdduserRoutingModule      
    ],    
    declarations: [
      AdduserComponent
    ],

    
})
export class AdduserModule { }
