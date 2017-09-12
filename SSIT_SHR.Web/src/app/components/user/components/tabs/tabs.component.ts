import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Injector } from '@angular/core';
import {Tabservice} from './tabs.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  public tabflag:1;
  public data: any;
  public message:any;
  username:any;
  public UserList: Array<any>;
  public transaction:Array<any>=[];
  public moduledata:Array<any>=[];
  public usergroupdata:Array<any>=[];
  public userdetailid:any;
  fullName:any; 
  email:any;
  labelTranslationItem:any;
  currentlabelTranslation:any;
  values: boolean = true;
  selectedata:Array<any>=[];
  transactiondata:Array<any>=[];
  userGroupdata:Array<any>=[];
  constructor(public tabservice:Tabservice) { }

   ngOnInit() {
      this.tabservice.GetUserDetail().subscribe((res)=>{
      this.data = res.result.userDetail[0];
      this.username=this.data.userName;
      this.fullName=this.data.fullName;
      this.email=this.data.email;
          console.log(res);
          console.log(this.data);
            for (var i = 0; i < this.data.transaction.length; i++) {
            this.transaction.push(this.data.transaction[i]);   
             }
             for (var i = 0; i < this.data.module.length; i++) 
                {
              this.moduledata.push(this.data.module[i]);
             } 
            // this.usergroupdata=this.data.userGroup[0];
            //  console.log(this.usergroupdata);
              for (var i = 0; i < this.data.userGroup.length; i++) {
              this.usergroupdata.push(this.data.userGroup[i]);
                console.log(this.usergroupdata);
             } 
          })       
     }
     getTranslationItem(item: string) {
         debugger;
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

    getTranslationItem1(item: string) {

          let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
               if(Menutranslationfile!=null)
               {
               this.currentlabelTranslation = JSON.parse(Menutranslationfile);
               this.labelTranslationItem=this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[0].values;
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
                
getTranslationItem2(item: string) {

          let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
               if(Menutranslationfile!=null)
               {
               this.currentlabelTranslation = JSON.parse(Menutranslationfile);
               this.labelTranslationItem=this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[13].values;
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
   onUpdate() {
        this.values = !this.values;
       if(this.values==true)  
        {
      if(this.tabflag==1)
        {

        }
      else if (this.tabflag==2)
        {
        this.usertransactionupdate();
         }
        else if(this.tabflag==3)
         {
        this.usermoduleupdate();
         }
         else if(this.tabflag==4){
            this.usergroupupdate();
            }
        else{

        }
        }
       }
   public Transactiondata(transactionid:number,isChecked:boolean){
        var hasitem;
       if(isChecked == true)
         {
          hasitem =1;
         }
     else
        {
         hasitem = 0;
        }
     for(var i=0;i<this.transaction.length;i++)
        {
            if(this.transaction[i].transactionCode == transactionid)
                {
                    this.transaction[i].hasItem = hasitem;
                }
        }
           console.log(this.transaction);     
      }

   public Moduledata(modulename:string,isChecked:boolean)
     { 
       var hasitem;
       if(isChecked == true)
          {
            hasitem =1;
          }
       else
        {
           hasitem = 0;
        }
       for(var i=0;i<this.moduledata.length;i++)
        {
            if(this.moduledata[i].moduleID== modulename)
                {
                    this.moduledata[i].hasItem = hasitem;
                   
                }  
        }
            console.log(this.moduledata);
        }
     public Usergoupdata(groupdata:string,isChecked:boolean)
     {
         var hasitem;
       if(isChecked == true)
          {
            hasitem =1;
          }
       else
        {
           hasitem = 0;
        }
       for(var i=0;i<this.usergroupdata.length;i++)
        {
            if(this.usergroupdata[i].userGroupID== groupdata)
                {
                    this.usergroupdata[i].hasItem = hasitem;
                   
                }  
        }
            console.log(this.usergroupdata);

     }
     
     public usermoduleupdate(){
          debugger;
          this.selectedata = [];
          for(var i=0;i<this.moduledata.length;i++)
          {
            if(this.moduledata[i].hasItem == 1 )
                {
                  this.selectedata.push(this.moduledata[i].moduleID);
                }
          }  
          console.log(this.selectedata);
          this.tabservice.updatemoduledata(this.selectedata).map(res => res)
            .subscribe(res => {
                console.log("Res >>>>>", res);
                
                this.notificationMessage();
                this.message = "Data Saved Sucessfully!!"
            }, err => {
                console.log('eerrr comp', err)
                if (err.code === 401) {
                    this.notificationMessage();
                    this.message = "Data Not Saved !!"
                    console.log("err", err);
                }
            });
      }
        public usertransactionupdate(){
            debugger;
            this.transactiondata =[];
         for(var i=0;i<this.transaction.length;i++)
          {
            if(this.transaction[i].hasItem == 1 )
                {
                  this.transactiondata.push(this.transaction[i].transactionCode);
                }
          }  
          console.log(this.transactiondata);
          this.tabservice.updatetransactiondata(this.transactiondata).map(res => res)
            .subscribe(res => {
                console.log("Res >>>>>", res);
                
                this.notificationMessage();
                this.message = "Data Saved Sucessfully!!"
            }, err => {
                console.log('eerrr comp', err)
                if (err.code === 401) {
                    this.notificationMessage();
                    this.message = "Data Not Saved !!"
                    console.log("err", err);
                }
            });

        }
     public usergroupupdate()
     { 
         debugger;
         this.userGroupdata=[];
          for(var i=0;i<this.usergroupdata.length;i++)
          {
            if(this.usergroupdata[i].hasItem == 1 )
                {
                  this.userGroupdata.push(this.usergroupdata[i].userGroupID);
                }
          }  
          console.log(this.userGroupdata);
          this.tabservice.updategroupdata(this.userGroupdata).map(res => res)
            .subscribe(res => {
                console.log("Res >>>>>", res);
                
                this.notificationMessage();
                this.message = "Data Saved Sucessfully!!"
            }, err => {
                console.log('eerrr comp', err)
                if (err.code === 401) {
                    this.notificationMessage();
                    this.message = "Data Not Saved !!"
                    console.log("err", err);
                }
            });


     }
         fetchNews(data){
             debugger;
             this.tabflag = data;
          
        }
      notificationMessage() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

       
  }
 
 


