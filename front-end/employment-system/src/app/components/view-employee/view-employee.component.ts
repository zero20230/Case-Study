import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {  FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  private sub: any;
  response = [] as any;
  id:any;
  userData:any
  viewForm :FormGroup;

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
 
    this.viewForm = new FormGroup({
      _id : new FormControl(this.userData ? this.userData._id : ''),
      firstName : new FormControl(this.userData ? this.userData.firstName : ''),
      middleName : new FormControl(this.userData ? this.userData.middleName : ''),
      lastName : new FormControl(this.userData ? this.userData.lastName : ''),
      birthDate : new FormControl(this.userData ? this.userData.birthDate : ''),
      position : new FormControl(this.userData ? this.userData.position : ''),
    })

    this.sub = this.route.queryParams.subscribe(params => {
     this.id = params["_id"];  
    });

    this.fetchEmployees();

    if (this.response.length==0) { 
        this.http.get<any>('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
          .subscribe(
            (data) => {
              this.userData = data;
              console.log(this.userData[0].birthDate)
              this.viewForm.patchValue({
                _id: this.userData[0]._id,
                firstName: this.userData[0].firstName,
                middleName: this.userData[0].middleName,
                lastName: this.userData[0].lastName,
                birthDate: this.userData[0].birthDate,
                position: this.userData[0].position,
              })
            },);
    }

  }

  private fetchEmployees(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response=employee;
      console.log(this.response);
    })
  }

}

