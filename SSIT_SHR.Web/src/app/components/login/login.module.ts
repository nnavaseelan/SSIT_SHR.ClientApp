import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './loginComponent/login.component';
import { LoginService } from './login.service';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule 
    ],
    declarations:[LoginComponent],
    providers:[LoginService]
})
export class LoginModule {
}
