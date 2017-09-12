import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/translation/translation.service';
import { Headerservice } from './header.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    currentlabelTranslation:any;
    labelTranslationItem:any;
    UserName = "";
    public data:Array<any>;
    constructor(
        private translate: TranslateService, public router: Router, public translation: TranslationService,public headerService:Headerservice) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
        this.UserName = localStorage.getItem("currentUser.username");

        const dom: any = document.querySelector('body');
        let langid = localStorage.getItem('currentUser.languageID');

        if (langid == '2') {
            dom.classList.add('rtl');
        }
        else {
            dom.classList.remove('rtl');
        }
    }

    ngOnInit() { 
        this. UserNotification();
    }
    toggleSidebar2(event: any) {
         const dom: any = document.querySelector('.main-container');
         dom.classList.toggle('main-container-collapse');
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');

    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUser.translationfile');
        localStorage.removeItem('currentUser.currentmenu');
        const dom: any = document.querySelector('body');
        dom.classList.remove('rtl');
        this.router.navigate(['./login']);

    }
    public  UserNotification()
    {
           this.headerService.notificationservice().subscribe((res) => {this.data=res.result.notifications; 
            console.log(this.data);
            localStorage.setItem("notificationdata", JSON.stringify(this.data));
        }) 
    }
 public   getTranslationItem(item: string) {

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



    changeLang(language: string) {
        localStorage.setItem('currentUser.languageID', language);
        localStorage.removeItem('currentUser.translationfile');
        this.translation.UserTranslation()
            .subscribe(res => {
                localStorage.setItem('currentUser.translationfile', JSON.stringify(res));
                location.reload();
            });



        //this.router.navigate(['dashboard']);

        //localStorage.removeItem('currentUser');
        //this.translate.use(language);
        const dom: any = document.querySelector('body');
        if (language == 'ur') {
            dom.classList.add('rtl');
        }
        else {
            dom.classList.remove('rtl');
        }
    }
}
