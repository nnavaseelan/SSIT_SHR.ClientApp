import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Userservice } from '../user/user.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    UserList : [{
        FirstName: string,
        LastName : string,
        UserName : string
    }];
    public Userdata:Array<any>;
    
    constructor(public userservice:Userservice) {
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        });

        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        }, {
            id: 2,
            type: 'warning',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
        });
         this.UserList = [{
            FirstName: "Maulik",
            LastName: "Parekh",
            UserName: "admin"
        },
        {
          FirstName: "Mahesh",
          LastName: "Chauhan",
          UserName: "admin"
        }]
        
    }

    ngOnInit() {
       
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
  
 
}
