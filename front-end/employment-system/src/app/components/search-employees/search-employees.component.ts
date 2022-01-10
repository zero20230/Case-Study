import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router ,NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})

export class SearchEmployeesComponent implements OnInit {
  getForm :FormGroup;
  constructor(private http:HttpClient, private router: Router) { }
  response = [] as any;
  results ="";
  
  ngOnInit(): void {

    this.getForm = new FormGroup({
      'firstName' : new FormControl(null),
      'lastName' : new FormControl(null),
      'position' : new FormControl(null),
    })
 
  }


 headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
 
  private fetchEmployees1(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?firstName='+this.getForm.value.firstName,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response=employee;
     
    })
  }

  private fetchEmployees2(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?lastName='+this.getForm.value.lastName,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
   
    })
  }

  private fetchEmployees3(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?position='+this.getForm.value.position,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
     
    })
  }

  private fetchEmployees4(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?firstName='
      +this.getForm.value.firstName+"&lastName="+this.getForm.value.lastName,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
     
    })
  }

  private fetchEmployees5(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?firstName='
      +this.getForm.value.firstName+"&position="+this.getForm.value.position,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
      
    })
  }

  private fetchEmployees6(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?firstName='
      +this.getForm.value.firstName+"&lastName="+this.getForm.value.lastName+"&position="+this.getForm.value.position,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
      
    })
  }

  private fetchEmployees7(){
    this.http.get<any>
    ('http://localhost:8080/api/employee/find?lastName='
      +this.getForm.value.lastName+"&position="+this.getForm.value.position,{ 'headers': this.headers })
    .subscribe(employee=>{
      this.response=employee;
      
    })
  }

  OnSubmit(){
   
      if(this.getForm.value.firstName!=null && this.getForm.value.lastName == null && this.getForm.value.position == null) {
        this.fetchEmployees1();
			}
      else if(this.getForm.value.firstName==null && this.getForm.value.lastName!=null && this.getForm.value.position==null) {
				this.fetchEmployees2();
			}
      else if(this.getForm.value.firstName==null && this.getForm.value.lastName==null && this.getForm.value.position!=null) {
				this.fetchEmployees3();
			}
      else if(  this.getForm.value.firstName!=null && this.getForm.value.lastName!=null && this.getForm.value.position==null) {
        this.fetchEmployees4();
			}
      else if(this.getForm.value.firstName!=null && this.getForm.value.lastName==null && this.getForm.value.position!=null) {
        this.fetchEmployees5();
			}
      else if(this.getForm.value.firstName!=null && this.getForm.value.lastName!=null && this.getForm.value.position!=null) {
        this.fetchEmployees6();
			}
      else if(this.getForm.value.firstName==null && this.getForm.value.lastName!=null && this.getForm.value.position!=null) {
        this.fetchEmployees7();
			}
      else if(this.getForm.value.firstName==null && this.getForm.value.lastName==null && this.getForm.value.position==null) {
        this.results="0 results found";
			}
      
      this.results="0 results found";
     
  }

  Reset(){
    this.getForm.reset();
}
    

goToView(id:string){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id": id
      }
    };
  this.router.navigate(['viewEmployees'],navigationExtras);
}
   
goToEdit(id:string){  
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "_id": id
    }
  };
  this.router.navigate(['editEmployees'],navigationExtras);
}

goToAdd(id:string){  
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "_id": id
    }
  };
  this.router.navigate(['addCompensation'],navigationExtras);
}
goToViewCompensation(id:string){  
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "_id": id
    }
  };
  this.router.navigate(['monthSelection'],navigationExtras);
}
  
    
  }

  

