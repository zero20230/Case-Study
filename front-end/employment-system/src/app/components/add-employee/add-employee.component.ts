import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

   postForm :FormGroup;
   response='';
   url = 'http://localhost:8080/api/employee/add';
   

  constructor(private http:HttpClient,private router: Router) {}

  ngOnInit() {
      this.postForm = new FormGroup({
        'firstName' : new FormControl(null,Validators.required),
        'middleName' : new FormControl(null),
        'lastName' : new FormControl(null,Validators.required),
        'birthDate' : new FormControl(null,Validators.required),
        'position' : new FormControl(null,Validators.required),
      })
  }

  OnSubmit(){

    this.http.post(this.url,this.postForm.value,{responseType: 'text'})
      .subscribe(responseData=>{
          this.response=responseData;
          if(this.response == "Employee Added Succesfully"){
              window.alert(this.response);
              this.router.navigate(['']);
          }
          else{
              window.alert(this.response);
          }
      })
    this.postForm.markAllAsTouched();

  }
  
}



