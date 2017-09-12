import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-notificationdetail',
    templateUrl: './notificationdetail.component.html',
     styleUrls: ['./notificationdetail.component.scss']
})
export class NotificationdetailComponent implements OnInit {
    public storedNames:Array<any>;
    currentlabelTranslation:any;
    labelTranslationItem:any;
    constructor() { }
    ngOnInit() { 
        this.Notificationlist();
        }
    Notificationlist(){
         this.storedNames = JSON.parse(localStorage.getItem("notificationdata"));
         console.log(this.storedNames);
        
    }
     getTranslationItem(item: string) {

          let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
          console.log(Menutranslationfile);
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

    
}
