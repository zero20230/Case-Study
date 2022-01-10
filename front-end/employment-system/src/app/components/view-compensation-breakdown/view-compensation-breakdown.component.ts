import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-compensation-breakdown',
  templateUrl: './view-compensation-breakdown.component.html',
  styleUrls: ['./view-compensation-breakdown.component.css']
})
export class ViewCompensationBreakdownComponent implements OnInit {
  private sub: any;
  id:any;
  year:number;
  month:number;
  count:number;
  iyear :number;
  imonth:number;
  fyear:number;
  fmonth:number;
  identifier:number;

  response = [] as any;

  constructor(private route: ActivatedRoute,private router: Router,private http:HttpClient) { }

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  ngOnInit(): void {

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
      this.year = params["year"];  
      this.month = params["month"];  
      this.count = params["count"]; 
      this.iyear = params["iyear"]; 
      this.imonth = params["imonth"]; 
      this.fyear = params["fyear"]; 
      this.fmonth = params["fmonth"]; 
      this.identifier = params["identifier"]; 
      this.identifier=this.identifier-this.count
      this.identifier=this.identifier+1;
    });

    this.http.get<any>
    ('http://localhost:8080/api/employee/viewCompensation?_id='+this.id+"&startM="+this.month+"&startY="+this.year
    +"&endM="+this.month+"&endY="+this.year,{ 'headers': this.headers })
    .subscribe( employee=>{
      this.response = employee
    })
    
   
  }

  goToHome(){  
    this.router.navigate(['']);
  }

  goToViewCompensation(id:string,iyear:number,imonth:number,fyear:number,fmonth:number){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id": id,
        "startY" :iyear,
        "startM" :imonth,
        "endY" :fyear,
        "endM" :fmonth
      }
    };
   this.router.navigate(['viewCompensationH'],navigationExtras);
  }

  goToEditCompensation(id:string,position:number,amount:number,description:string,year:number,month:number,identifier:number){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id": id,
        "position":position,
        "amount": amount,
        "description":description,
        "year":year,
        "month":month,
        "identifier":identifier
      }
    };
    this.router.navigate(['editCompensation'],navigationExtras);
  }

}
