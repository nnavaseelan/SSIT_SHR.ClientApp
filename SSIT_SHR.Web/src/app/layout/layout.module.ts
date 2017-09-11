import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { Ng2CompleterModule } from "ng2-completer";

@NgModule({
    imports: [
        CommonModule,FormsModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,Ng2CompleterModule,
        TranslateModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
    
    ]
})
export class LayoutModule { }
