import {Component,OnInit} from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { Userservice } from './user.service';
import { routerTransition } from '../../router.animations';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [routerTransition()]
})
export class Usercomponent {
  public Username:"";
  public Fullname:"";
  public show:boolean=false;
  public Email:"";
  public userdata: Array<any>;
  public rows: Array<any> = [];
  labelTranslationItem:any;
  currentlabelTranslation:any
  public columns: Array<any>=[
    
     {
      title:this.getTranslationItem('lbl_User_FullName'),
      name: 'fullName',
    },
    {
      title:this.getTranslationItem('lbl_User_UserName'),
      name: 'username'
    },
    {
      title:this.getTranslationItem('lbl_User_Email'),
      name: 'email'
    },
  ]; 
  public page: number = 1;
  public itemsPerPage: number = 20;
  public maxSize: number = 5;
  public length: number = 0;
  public totalPage=0;
  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  public data: Array<any> =this.data;
  edited:boolean;

constructor(public userservice:Userservice, public router:Router)
{
  // this.length = this.data.length;
}

    ngOnInit(){
  
    }
    toggleSearch(event: any) {
        console.log("aaayaya",event.srcElement.className);
         const fas: any = document.querySelector('.searchPlus');
         fas.classList.toggle('fa-minus');   
         const dom: any = document.querySelector('.line');
        
         dom.classList.remove('searchHide');
    }
        
    public userlist(){
        this.userservice.Userlist(this.Username,this.Fullname,this.Email).subscribe((res) => {
        this.data=(res.result);
         console.log(this.data);
          this.length = this.data.length;
          this.totalPage = this.length/this.itemsPerPage;
          this.totalPage= Math.ceil(this.totalPage);
         this.onChangeTable(this.config);
         this.show=true;
     })
  }
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




   public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1
      ? (start + page.itemsPerPage)
      : data.length;
    return data.slice(start, end);
    }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc'
          ? -1
          : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc'
          ? -1
          : 1;
      }
      return 0;
    });
  }

public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString()
                             .match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, pageNumber?: number): any {
    const page : {itemsPerPage: number, page: number} = {
      itemsPerPage: this.itemsPerPage,
      page: pageNumber ? pageNumber : 1
    };
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging
      ? this.changePage(page, sortedData)
      : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(userdedaildata: any): any {
    this.router.navigate(['./userview']);
    localStorage.setItem("userdetailId",userdedaildata.row.userID);
    console.log(userdedaildata.row.userID);
  }
  public  Redirect(){
      this.router.navigate(['./adduser']);
      }
 
}