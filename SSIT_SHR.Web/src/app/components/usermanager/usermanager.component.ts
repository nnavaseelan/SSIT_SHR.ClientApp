import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss'],
  animations: [routerTransition()]
})
export class UsermanagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
}
