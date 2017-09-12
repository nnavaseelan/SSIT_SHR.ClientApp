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

    finalData = [];
    loader: boolean = true;

    storage = localStorage.getItem('access_token');
    currentUser = localStorage.getItem('currentUser.UserID');

    public searchData = {

    }

    public employee = {
        "UserID": this.currentUser,
        "GivenName": "",
        "SurName": "",
        "ID": "",
        "IDAlt": "",
        "ResidencyID": "",
        "PageSize": "10",
        "Pagenumber": "1"
    }

    toggleSearch(event: any) {
        console.log("aaayaya",event.srcElement.className);
         const fas: any = document.querySelector('.searchPlus');
         fas.classList.toggle('fa-minus');   
         const dom: any = document.querySelector('.line');
        
         dom.classList.toggle('searchHide');
    }


    employeeDetail(employee) {
        console.log("Employee", employee.id);
        this.profileName = employee.fullName;
        this.router.navigate(['/employeelist/employee-detail', employee.id, employee.fullName]);

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