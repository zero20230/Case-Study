import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {  FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-compensation',
  templateUrl: './edit-compensation.component.html',
  styleUrls: ['./edit-compensation.component.css']
})
export class EditCompensationComponent implements OnInit {
  editCompensationForm :FormGroup;
  private sub: any;
  id:any;
  position:number;
  amount:number;
  year:number;
  month:number;
  description:String;
  compensationData:any

  response = [] as any;
  body = [] as any;
  reply = [] as any;
  compensations_array  = [] as any;

  constructor(private route: ActivatedRoute,private router: Router,private http:HttpClient,private location: Location) { }

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
      this.position = params["identifier"];  
      this.position = this.position-1;
      this.amount = params["amount"];  
      this.description = params["description"];  
      this.year = params["year"];  
      this.month = params["month"];  
    });

    this.editCompensationForm = new FormGroup({
      amount : new FormControl(this.amount),
      description : new FormControl(this.description),
    })

    this.fetchEmployee();

  }

  OnSubmit(){
    this.body = { _id: this.response[0]._id,
      firstName : this.response[0].firstName,
      middleName : this.response[0].middleName,
      lastName : this.response[0].lastName,
      birthDate : this.response[0].birthDate,
      position : this.response[0].position,
      compensations : this.compensations_array              
      };  

   this.http.put('http://localhost:8080/api/employee/editCompensation?position='+this.position+
                "&description="+this.editCompensationForm.value.description+"&amount="+this.editCompensationForm.value.amount
                 +"&year="+this.year+"&month="+this.month
                ,this.body,{responseType: 'text'})
    .subscribe(responseData=>{
              this.reply=responseData;
              if(this.reply == "ok"){
                window.alert("employee updated succesfully");
                location.reload();
              }
              else{
                window.alert(this.reply);}
            })
    this.location.back(); 
  }

  fetchEmployee(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/view?_id='+this.id,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response = employee
      this.compensations_array = this.response[0].compensations;
      this.compensations_array.sort((a:any, b:any) => (a.month > b.month ? -1 : 1)); 
      this.compensations_array.sort((a:any, b:any) => (a.year < b.year ? -1 : 1));
    })
  }

}
