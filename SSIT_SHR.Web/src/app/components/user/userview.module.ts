import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserViewComponent} from './userview.component';
import { UserViewRoutingModule} from './userview-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    TabsComponent
} from './components';

@NgModule({
    imports: [  
        UserViewRoutingModule,CommonModule,FormsModule,ReactiveFormsModule,NgbModule.forRoot()
     
    ],
    declarations: [
      UserViewComponent,
      TabsComponent
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class UserViewModule{} 