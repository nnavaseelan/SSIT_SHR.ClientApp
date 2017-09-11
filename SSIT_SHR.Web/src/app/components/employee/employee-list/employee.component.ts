import { Component, Input } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/translation/translation.service';

@Component({
    selector: 'app-employeelist',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss'],
    animations: [routerTransition()]
})
export class Employeecomponent {
    constructor(private employeeService: EmployeeService, private router: Router) {
    }
    ngOnInit() {
        this.employeeListingData();
    }

    @Input() profileName: string;

    public finalData = [];
    public loader: boolean = true;
    public storage = localStorage.getItem('access_token');
    public currentUser = localStorage.getItem('currentUser.UserID');
    currentlabelTranslation;
    labelTranslationItem;

    public employee = {
        "UserID": this.currentUser,
        "GivenName": "",
        "SurName": "",
        "ID": "",
        "IDAlt": "",
        "ResidencyID": "",
        "PageSize": "",
        "Pagenumber": ""
    }


    getTranslationItem(item: string) {

        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        if (Menutranslationfile != null) {
            this.currentlabelTranslation = JSON.parse(Menutranslationfile);
            this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[1].values;
        }

        if (!item) {
            return "No Trans";
        }
        if (!this.labelTranslationItem) {
            return "No Trans";
        }
        this.labelTranslationItem = this.labelTranslationItem.filter((fitem) => fitem.lbl.toLowerCase().indexOf(item.toLowerCase()) > -1);
        if (!this.labelTranslationItem[0]) {
            return "No Trans";
        }
        return this.labelTranslationItem[0].txt
    }

    toggleSearch(event: any) {
        const fas: any = document.querySelector('.searchPlus');
        fas.classList.toggle('fa-minus');
        const dom: any = document.querySelector('.line');
        dom.classList.toggle('searchHide');
    }


    employeeDetail(employee) {
        console.log("Employee", employee.id);
        this.profileName = employee.fullName;
        this.router.navigate(['/employeelist/detail', employee.id]);

    }

    employeeListingData() {
        this.employeeService.getEmployeeList(this.employee).map(res => res.json())
            .subscribe(res => {
                this.finalData = res.result.employees;
                this.loader = false;
                console.log(this.finalData);
            }, err => {
                console.log('eerrr comp', err)
                this.loader = false;
                if (err.code === 401) {
                    console.log("err", err);
                }
            });
    }
}