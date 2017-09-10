import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../menu/menu.service';
import { TranslationService } from '../../translation/translation.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    menuItems: Array<any>;
    showMenu = '';
    menuTranslation: Array<any>;
    menuTranslationItem: any;
    selectedItem: any;
    currentMenuTranslation: any
    currentNavMenu: any
    router: Router;
    constructor(public menu: MenuService, public injector: Injector, public translation: TranslationService) {

        // this.menuItems = menu.getMenu();

    }

    getTranslationItem(item: any) {

        if (!item) {
            return "No Trans";
        }
        if (!this.menuTranslation) {
            return "No Trans";
        }
        this.menuTranslationItem = this.menuTranslation.filter((fitem) => fitem.lbl.toLowerCase().indexOf(item.moduleID.toLowerCase()) > -1);
        if (!this.menuTranslationItem[0]) {
            return "No Trans";
        }
        return this.menuTranslationItem[0].txt
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    ngOnInit() {

        this.router = this.injector.get(Router);

        this.router.events.subscribe((val) => {
            // close any submenu opened when route changes
            //this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
        });


        let NavMenu = localStorage.getItem("currentUser.currentmenu");
        if (NavMenu != null) {
            this.currentNavMenu = JSON.parse(NavMenu);
            this.menuItems = this.currentNavMenu
        }



        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        if (Menutranslationfile != null) {
            this.currentMenuTranslation = JSON.parse(Menutranslationfile);
            this.menuTranslation = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[0].values;
        }


        // this.menu.LoadMenu()
        // .subscribe(response => {

        //    this.translation.UserTranslation()
        //        .subscribe(res => {

        //         localStorage.setItem('currentUser.translationfile',JSON.stringify(res));
        //        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        //        if(Menutranslationfile!=null)
        //        {
        //        this.currentMenuTranslation = JSON.parse(Menutranslationfile);
        //        this.menuTranslation=this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[0].values;
        //         }

        //       }); 
        //   this.menuItems=response.result;
        // });


        //  this.translation.UserTranslation()
        //     .subscribe(res => {
        //     this.menuTranslation=res.result[0].rSreturnJSONFile.tc[0].values;
        //localStorage.setItem('currentUser.returnTrasJSONFile',JSON.stringify(res.json()));
        //     });

    }
}
