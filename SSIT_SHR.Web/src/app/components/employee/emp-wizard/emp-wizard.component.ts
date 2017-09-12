import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emp-wizard',
  templateUrl: './emp-wizard.component.html',
  styleUrls: ['./emp-wizard.component.scss']
})
export class EmpWizardComponent implements OnInit {

  constructor(private _router: Router) { }
 
  ngOnInit() {

  }

}
