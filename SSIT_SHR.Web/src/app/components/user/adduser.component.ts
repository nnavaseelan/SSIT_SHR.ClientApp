import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {routerTransition } from "app/router.animations";
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import {Userservice} from './user.service';

@Component({
    selector: 'app-adduser',
    templateUrl: './adduser.component.html',
     styleUrls: ['./adduser.component.scss'],
    animations: [routerTransition()]
})

export class AdduserComponent{
 edited:boolean;
 Username:"";
 Fullname="";
 Password:"";
 Email:"";
 ConfirmPassword:"";
 selectLanguage:any; 
 model: any = {};
 display = 0;
 valForm: FormGroup;
 public selectOption: any;
 labelTranslationItem:any;
 currentlabelTranslation:any;
  constructor(public userservice:Userservice,public fb: FormBuilder,public router:Router){
    this.selectOption= [{ value: 1,Text:'English' }, { value:2,Text:'Arabic'}];

    this.valForm = fb.group({
            'Fullname':[null,Validators.required],
            'UserName':[null,Validators.required],
            'Password':[null,Validators.required],
            'ConfirmPassword':[null,Validators.required],
            'Email':[null,Validators.required],
            'Language':[null,Validators.required]
        });

  }
  ngOnInit() { }
   getTranslationItem(item: string) {

          let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
               if(Menutranslationfile!=null)
               {
               this.currentlabelTranslation = JSON.parse(Menutranslationfile);
               this.labelTranslationItem=this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[1].values;
                }
              
    if (!item) {
        return "No Trans";
    }
    if(!this.labelTranslationItem)
        {
              return "No Trans";
        }
     this.labelTranslationItem = this.labelTranslationItem.filter((fitem) => fitem.lbl.toLowerCase().indexOf(item.toLowerCase())>-1);
     if (!this.labelTranslationItem[0]) {
        return "No Trans";
    }
    return   this.labelTranslationItem[0].txt
}
  submitForm($ev, value: any) {
        $ev.preventDefault();   
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
    }
   
  public addUser()
  {  
    
      if(this.selectLanguage == "English")
      {
        this.selectLanguage = 1;
      }
      else
      {
          this.selectLanguage = 2;
      }
    this.userservice.Adduser(this.Fullname,this.Username,this.Password,this.Email,this.selectLanguage)
    .subscribe(res => {
          console.log(res);  
          this.edited = true;
        //   this.router.navigate(['./userlist']);
            this.Fullname = "";
            this.Username ="";
            this.Password="";
            this.Email="";
            this.ConfirmPassword="";
            this.display=1;
        },
        error => {
           this.edited = false;
        });
  }
    public cancelUser()
  {  
    this.edited = false;
     this.router.navigate(['./userlist']);
  }
 

 
}