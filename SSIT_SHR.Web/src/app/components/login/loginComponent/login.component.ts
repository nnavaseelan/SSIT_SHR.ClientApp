import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs/Rx';
import { TranslationService } from '../../../shared/translation/translation.service';
import { MenuService } from '../../../shared/menu/menu.service';
@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.scss'],
    animations:[routerTransition()]
})

export class LoginComponent implements OnInit {
    model: any = {};
    valForm: FormGroup;
    Success="";
    info = "";
    alertmsg="";
    loading = false;
    returnUrl: string;
   
edited:boolean;
    constructor(public loginService:LoginService,public fb: FormBuilder,public router:Router, private route: ActivatedRoute,public translation:  TranslationService,public menu: MenuService ) {
       this.valForm = fb.group({
            'ClientCode':[null,Validators.required],
            'UserName': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }
    submitForm($ev, value: any) {
        $ev.preventDefault();
        this.onLoggedin();
    //    var isUserValidated =this.loginService.UserLogin(this.model.ClientCode,this.model.UserName,this.model.password);
       
      
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
    }

    ngOnInit() {
        
          // reset login status
        // this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onLoggedin() {
      
     
        let commentOperation:Observable<Comment[]>;
          this.loginService.UserLogin(this.model.ClientCode,this.model.UserName,this.model.password)
          .subscribe( 
               response => {
          console.log(response);
              //localStorage.setItem('access_token', response.json().access_token);
            
         this.menu.LoadMenu()
        .subscribe(response => {
      
           localStorage.setItem('currentUser.currentmenu',JSON.stringify(response.result));
           
          this.translation.UserTranslation()
               .subscribe(res => {
    
                   localStorage.setItem('currentUser.translationfile',JSON.stringify(res));
                   this.router.navigate(['dashboard']);
              });
        });
            
            
             // return response.json();
           
        },
        error => {
           this.edited = true;
              //  alert(error.error_description);
            //this.info="danger";
            //this.alertmsg="Invalid Credentials!";
          
      
        });

    }

}
