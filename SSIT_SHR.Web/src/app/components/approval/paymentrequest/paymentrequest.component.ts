import {Component} from '@angular/core';
import { Approvalservice} from '../approval.service';


@Component({
    selector: 'app-myapproval',
    templateUrl: './paymentrequest.component.html',
    styleUrls: ['./paymentrequest.component.scss']
   
})
export class Paymentrequestcomponent{
  values: boolean = true;
 public data:any;
 public requestTypeID:any;
 public requestStartDate:any;
 public employmentID:any;
 constructor(public approvalservice:Approvalservice){}
 ngOnInit(){
    //  this.data=localStorage.getItem("requestpaymentdata");
     this.Requestdata();
 }
    public Requestdata(){
        debugger;
        this.requestTypeID=localStorage.getItem("requestTypeID");
        // this.requestTypeID=localStorage.getItem("requestTypeID");
        this.requestStartDate=localStorage.getItem("requestStartDate");
        this.employmentID=localStorage.getItem("employmentID");
          console.log(this.employmentID);
    }
   onupdate()
   {
       this.values=!this.values;
   }
    public approveduser(){
        debugger;
         this.values=!this.values;
        this.approvalservice.Approveduser().subscribe((res) =>{this.data=res});
    }
    public declineduser(){
        debugger;
       this.approvalservice.Declineduser().subscribe((res) =>{this.data=res});
    }
}