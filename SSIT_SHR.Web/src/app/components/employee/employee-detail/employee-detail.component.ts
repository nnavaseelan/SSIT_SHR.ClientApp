import {Component, ViewChild, ElementRef, Renderer2, Output, Injector} from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/translation/translation.service';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-employeelist',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss'],
    animations: [routerTransition()]
})

export class EmployeeDetail {
    bloodType: Array<any>;
    religion: Array<any>;
    married: Array<any>;
    country: Array<any>;

    currentMenuTranslation: any;
    router: Router;
    constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private render2: Renderer2) {

    }

    ngOnInit() {

        let currentUser = localStorage.getItem('currentUser.UserID');
        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        if (Menutranslationfile != null) {
            this.currentMenuTranslation = JSON.parse(Menutranslationfile);
            for(let i =0; i < this.currentMenuTranslation.result[0].rSreturnJSONFile.tc.length; i++ ){
                if(this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].id == 13){
                    this.bloodType = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].values;
                }else if(this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].id == 5){
                    this.religion = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].values;
                }else if(this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].id == 11){
                    this.married = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].values;
                }else if(this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].id == 12){
                    this.country = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[i].values;
                }
            }
            console.info(this.bloodType);

        }


        if (this.route.snapshot.params['id']) {
            let id = this.route.snapshot.params['id'];
            let name = this.route.snapshot.params['name'];
            this.employeeDetail = {
                "UserID": currentUser,
                "EmployeeID": id,
                "Name": name
            }
            this.employeeDetailData();
        }
    }

    ngAfterViewInit() {
        // console.log("tabbingData", this.tabbingData);
        this.render2.addClass(document.querySelector(".tab-content"), "tabing");
        // console.log('tab Data', document.querySelector(".tab-content"))
    }

    @ViewChild('tabbingData') tabbingData: ElementRef;

    public employeeDetail = {}
    bankData = [];
    finalData = [];
    dependent = [];
    employment = [];
    insurance = [];
    profile;
    payRollData = [];
    public rowsOnPage = 10;
    rowsOnPageSet;
    public sortOrder = "asc";
    showHide:boolean;
    message: string;
    payRoll=[];
    payRollArray=[];
    payRollElement =[];
    employmentPayroll;
    residentialDocument = [];
    values: boolean = true;
    currentUser = localStorage.getItem('currentUser.UserID');
    public employeeMaster = {
        "userID": this.currentUser,
        "fullName": "",
        "givenName": "",
        "surname": "",
        "gender": "",
        "maritalStatusID": Number,
        "nationalityID": Number,
        "bloodTypeID": Number,
        "email": "",
        "mobileNumber": "",
        "foreignMobileNumber": "",
        "address": "",
        "district": "",
        "city": "",
        "countryID": Number,
        "birthDate": "",
        "idAlt": "",
        "religionID": Number,
        "alternativeName": "",
        "landline": "",
        "id": this.employeeDetail['EmployeeID'],
        "picture":"",
        "latitude": "",
        "longitude": "",
    };


    notificationMessage() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    masterData() {
        console.log("employeeMaster", this.employeeMaster);
        this.employeeService.saveMasterData(this.employeeMaster).map(res => res.json())
            .subscribe(res => {
                console.log("Res >>>>>", res);
                this.employeeDetailData();
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

    profileEvent(event: any) {
        // console.log("Event", event.srcElement.files[0]);
        let file = event.srcElement.files[0];
        let contenido;
        let fr = new FileReader();
        fr.onload = (e) => {
            this.employeeMaster.picture = fr.result.split(',')[1];
            // console.log(this.employeeMaster.picture);
        };
        fr.readAsDataURL(file);
    }

    onUpdate() {
        this.values = !this.values;
    }

    employmentTabData(value,index) {
        console.log("idd",value);
        console.log("index",index);
        this.employmentPayroll = value;
        this.employmentPayroll.payrollTemplate.forEach(element => {
              console.log("element>>>",element);
              this.payRollArray.push(element);
        });

    }



    employeeDetailData() {
        this.employeeService.getEmployeeDetail(this.employeeDetail).map(res => res.json())
            .subscribe(res => {
                this.finalData = res.result.employeeDetail.employee.forEach(element => {
                    // console.log("----Element---------", element);
                    this.employeeMaster.fullName = element.fullName;
                    this.employeeMaster.givenName = element.givenName;
                    this.employeeMaster.surname = element.surname;
                    this.employeeMaster.gender = element.gender;
                    this.employeeMaster.maritalStatusID = element.maritalStatusID;
                    this.employeeMaster.nationalityID = element.nationalityID;
                    this.employeeMaster.bloodTypeID = element.bloodTypeID;
                    this.employeeMaster.email = element.email;
                    this.employeeMaster.mobileNumber = element.mobileNumber;
                    this.employeeMaster.foreignMobileNumber = element.foreignMobileNumber;
                    this.employeeMaster.address = element.address;
                    this.employeeMaster.district = element.district;
                    this.employeeMaster.city = element.city;
                    this.employeeMaster.countryID = element.countryID;
                    this.employeeMaster.birthDate = element.birthDate;
                    this.bankData = element.bankConnection;
                    this.dependent = element.dependent;
                    this.employment = element.employment;
                    this.payRollData = element.employment;
                    // console.log("this.payRollData",this.payRollData);
                    this.insurance = element.insurance;
                    this.residentialDocument = element.residentialDocument;
                    this.employeeMaster.id = element.id;
                    this.employeeMaster.idAlt = element.idAlt;
                    this.employeeMaster.religionID = element.religionID;
                    this.employeeMaster.alternativeName = element.alternativeName;
                    this.employeeMaster.landline = element.landline;
                    this.employeeMaster.picture = element.picture;
                });
            }, err => {
                if (err.code === 401) {
                    console.log("err", err);
                }
            });
    }


}
