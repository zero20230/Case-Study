import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {  FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit {
  private sub: any;
  response = [] as any;
  reply = ' ';
  id:any;
  userData:any
  editForm :FormGroup;

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {

    this.editForm = new FormGroup({
      _id : new FormControl(this.userData ? this.userData._id : ''),
      firstName : new FormControl(this.userData ? this.userData.firstName : ''),
      middleName : new FormControl(this.userData ? this.userData.middleName : ''),
      lastName : new FormControl(this.userData ? this.userData.lastName : ''),
      birthDate : new FormControl(this.userData ? this.userData.birthDate : ''),
      position : new FormControl(this.userData ? this.userData.position : ''),
      compensations : new FormControl(this.userData ? this.userData.compensations : ''),
    })

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
     });

    this.fetchEmployees();
 
    //fills when opens
    this.http.get<any>('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
        .subscribe(
          (data) => {
            this.userData = data;
            this.editForm.patchValue({
              _id: this.userData[0]._id,
              firstName: this.userData[0].firstName,
              middleName: this.userData[0].middleName,
              lastName: this.userData[0].lastName,
              birthDate: this.userData[0].birthDate,
              position: this.userData[0].position,
              compensations: this.userData[0].compensations
             
            })
          },
        );
    
  }


  private fetchEmployees(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response=employee;
    })
  }


  OnSubmit(){
      if(this.editForm.get("position")?.touched && this.editForm.get("firstName")?.untouched && this.editForm.get("middleName")?.untouched ||
         this.editForm.get("lastName")?.untouched && this.editForm.get("birthDate")?.untouched){
                    this.http.patch('http://localhost:8080/api/employee/patch',this.editForm.value,{responseType: 'text'})
                    .subscribe(responseData=>{
                         this.reply=responseData;
                           if(this.reply == "ok"){
                            window.alert("employee updated succesfully");
                            location.reload();
                          }
                           else{
                              window.alert(this.reply);
                          }
                    })
      }
      else{
        this.http.put('http://localhost:8080/api/employee/update',this.editForm.value,{responseType: 'text'})
        .subscribe(responseData=>{
              this.reply=responseData;
              if(this.reply == "ok"){
                window.alert("employee updated succesfully");
                location.reload();
              }
              else{
               window.alert(this.reply);}
              }
        )} 
      }
}

  

