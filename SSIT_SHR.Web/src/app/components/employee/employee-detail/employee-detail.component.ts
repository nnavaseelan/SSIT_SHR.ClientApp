import { Component, ViewChild, ElementRef, Renderer2, Output } from '@angular/core';
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
    constructor(private employeeService: EmployeeService,private route: ActivatedRoute, private render2: Renderer2) {
     route.params.subscribe(val => {
          let currentUser = localStorage.getItem('currentUser.UserID');
          if (this.route.snapshot.params['id']) {
            let id = this.route.snapshot.params['id'];
            // let name = this.route.snapshot.params['name'];
            this.employeeDetail = {
                "UserID": currentUser,
                "EmployeeID": id
            }
            this.employeeDetailData();
        }
       });
    }
     

    ngOnInit() {
        this.gettranslateData();
        let currentUser = localStorage.getItem('currentUser.UserID');
        if (this.route.snapshot.params['id']) {
            let id = this.route.snapshot.params['id'];
            // let name = this.route.snapshot.params['name'];
            this.employeeDetail = {
                "UserID": currentUser,
                "EmployeeID": id
            }
            this.employeeDetailData();
        }
    }

    ngAfterViewInit() {
        console.log("tabbingData", this.tabbingData);
        this.render2.addClass(document.querySelector(".tab-content"), "tabing");
        console.log('tab Data', document.querySelector(".tab-content"))
        
    }

    @ViewChild('tabbingData') tabbingData: ElementRef;

    public employeeDetail = {}
    public bankData = [];
    public finalData = [];
    public dependent = [];
    public employment = [];
    public insurance = [];
    public profile;
    public payRollData = [];
    public rowsOnPage = 10;
    public rowsOnPageSet;
    public sortOrder = "asc";
    public showHide: boolean;
    public message: string;
    public payRoll = [];
    public payRollArray = [];
    public payRollElement = [];
    public employmentPayroll;
    public residentialDocument = [];
    public menuTranslationsBloodGroup;
    public values: boolean = true;
    currentMenuTranslation;
    menuTranslation;
    menuTranslations;
    menuTranslationsCountry;
    menuTranslationsGender;
    menuTranslationsMarriageStatus;
    public picture = { 
        "pictureID":""
     }  
    public currentUser = localStorage.getItem('currentUser.UserID');
    // public transitionData = localStorage.getItem('currentUser.translationfile');
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
        "latitude": "",
        "longitude": "",
    };
    public currentlabelTranslation: any;
    public labelTranslationItem: any;

    gettranslateData() {
        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        if (Menutranslationfile != null) {
            this.currentMenuTranslation = JSON.parse(Menutranslationfile);
            this.menuTranslation = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc;
            // this.menuTranslations = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[14].values;
            this.menuTranslationsCountry = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[11].values;
            this.menuTranslationsGender = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[9].values;
            this.menuTranslationsBloodGroup = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[12].values;
            this.menuTranslationsMarriageStatus = this.currentMenuTranslation.result[0].rSreturnJSONFile.tc[10].values;
            console.log("A", this.menuTranslation);
        }
    }

    getTranslationItem(item: string, id) {
       
        let Menutranslationfile = localStorage.getItem("currentUser.translationfile");
        if (Menutranslationfile != null) {
            this.currentlabelTranslation = JSON.parse(Menutranslationfile);
            if (id == 2) {
                this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[1].values;
            } else if(id == 15) {
                  this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[14].values;
            } else if(id == 10) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[9].values;
            } else if(id == 11) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[10].values;
            } else if(id == 5) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[4].values;
            } else if(id == 13) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[12].values;
            } else if(id == 6) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[5].values;
            } else if(id == 12) {
                   this.labelTranslationItem = this.currentlabelTranslation.result[0].rSreturnJSONFile.tc[11].values;
            }

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

    notificationMessage() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    masterData() {
        debugger;
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

    profileImageUpload() {
           this.employeeService.saveProfilePicture(this.picture).map(res => res.json())
            .subscribe(res => {
                console.log("Res >>>>>", res);
                
            }, err => {
                console.log('eerrr comp', err)
                if (err.code === 401) {
                    this.message = "Data Not Saved !!"
                    console.log("err", err);
                }
            });
    }

    profileEvent(event: any) {
        console.log("Event", event.srcElement.files[0]);
        let file = event.srcElement.files[0];
        let contenido;
        let fr = new FileReader();
        fr.onload = (e) => {
            this.picture.pictureID = fr.result.split(',')[1];
            console.log(this.picture.pictureID);
        };
        fr.readAsDataURL(file);
    }

    onUpdate() {
        this.values = !this.values;
        if (this.values == true) {
            this.profileImageUpload();
            this.masterData();
        }
    }

    employmentTabData(value, index) {
        console.log("idd", value);
        console.log("index", index);
        this.employmentPayroll = value;
        this.employmentPayroll.payrollTemplate.forEach(element => {
            console.log("element>>>", element);
            this.payRollArray.push(element);
        });

    }

    toggleSearch(event: any) {
        console.log("aaayaya", event.srcElement.className);
        const fas: any = document.querySelector('.searchPlus');
        fas.classList.toggle('fa-minus');
        const dom: any = document.querySelector('.line');

        dom.classList.toggle('searchHide');
    }



    employeeDetailData() {
        this.employeeService.getEmployeeDetail(this.employeeDetail).map(res => res.json())
            .subscribe(res => {
                this.finalData = res.result.employeeDetail.employee.forEach(element => {
                    console.log("Element", element);
                    // console.log("transcat",this.transitionData);
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
                    console.log("this.payRollData", this.payRollData);
                    this.insurance = element.insurance;
                    this.residentialDocument = element.residentialDocument;
                    this.employeeMaster.id = element.id;
                    this.employeeMaster.idAlt = element.idAlt;
                    this.employeeMaster.religionID = element.religionID;
                    this.employeeMaster.alternativeName = element.alternativeName;
                    this.employeeMaster.landline = element.landline;
                    // this.employeeMaster.picture = element.picture;
                    console.log("picture", this.employeeMaster.landline);
                });
            }, err => {
                if (err.code === 401) {
                    console.log("err", err);
                }
            });
    }


}