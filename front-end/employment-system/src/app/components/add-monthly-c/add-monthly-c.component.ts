import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-monthly-c',
  templateUrl: './add-monthly-c.component.html',
  styleUrls: ['./add-monthly-c.component.css']
})
export class AddMonthlyCComponent implements OnInit {
  addCompensationForm :FormGroup;
  private sub: any;
  dateTemp : Date ;
  id:any;
  body:any;
  response = [] as any;
  compensations_array  = [] as any;
  reply=' ';


  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit(): void {
    this.addCompensationForm = new FormGroup({
      'type' : new FormControl(null),
      'amount' : new FormControl(null),
      'description' : new FormControl(null),
      'date' : new FormControl(null),
    })

     this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
     });

     this.fetchEmployees();
    
  }

  OnSubmit(){
    let year = null
    let month = null

    if(this.addCompensationForm.get("type")?.untouched ||this.addCompensationForm.value.type == null ){
      window.alert("please select a type");
      location.reload();
    }
    if(this.addCompensationForm.get("amount")?.untouched || typeof this.addCompensationForm.value.amount != 'number'  ){
      window.alert("please introduce a valid amount");
      location.reload();
    }
    if(this.addCompensationForm.get("date")?.untouched ||this.addCompensationForm.value.date == null){
      window.alert("please select a valid date");
      location.reload();
    }
    else{
      year = new Date(this.addCompensationForm.value.date).getFullYear();
      month = new Date(this.addCompensationForm.value.date).getMonth();
      month = month+1;

          if(this.response[0].compensations==null){
                  this.body = { 
                              _id: this.response[0]._id,
                              firstName : this.response[0].firstName,
                              middleName : this.response[0].middleName,
                              lastName : this.response[0].lastName,
                              birthDate : this.response[0].birthDate,
                              position : this.response[0].position,
                              compensations : [
                                                {
                                                    type : this.addCompensationForm.value.type,
                                                    amount : this.addCompensationForm.value.amount,
                                                    description : this.addCompensationForm.value.description,
                                                    year : year,
                                                    month : month
                                                }
                              ]
                  }; 
          }else{
                this.compensations_array.push( {type : this.addCompensationForm.value.type,
                                                amount : this.addCompensationForm.value.amount,
                                                description : this.addCompensationForm.value.description,
                                                year : year,
                                                month : month});

                this.body = { _id: this.response[0]._id,
                firstName : this.response[0].firstName,
                middleName : this.response[0].middleName,
                lastName : this.response[0].lastName,
                birthDate : this.response[0].birthDate,
                position : this.response[0].position,
                compensations : this.compensations_array              
                };  
     }

    this.http.put
      ('http://localhost:8080/api/employee/addCompensation',this.body,{responseType: 'text'})
      .subscribe(responseData=>{
               this.reply=responseData;
               if(this.reply == "ok"){
                  console.log(this.addCompensationForm.value.firstName)
                  window.alert("employee updated succesfully");
                  location.reload();
                }
                else{
                   window.alert(this.reply);
                   location.reload();}
                 }
        )
    }

  }


private fetchEmployees(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response=employee;
      this.compensations_array = this.response[0].compensations;
    })
  }

}
