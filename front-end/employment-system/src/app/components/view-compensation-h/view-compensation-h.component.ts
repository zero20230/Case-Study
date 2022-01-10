import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-view-compensation-h',
  templateUrl: './view-compensation-h.component.html',
  styleUrls: ['./view-compensation-h.component.css']
})
export class ViewCompensationHComponent implements OnInit {
  private sub: any; 
  id:any;
  startM:any;
  startY:any;
  endM:any;
  endY:any;
  body:any;
  x:number;
  
  response = [] as any;
  result = [] as any;
  year = [] as any;
  list = [] as any;

 
  constructor(private route: ActivatedRoute,private router: Router,private http:HttpClient) { }

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
      this.startM = params["startM"];  
      this.startY = params["startY"];  
      this.endM = params["endM"];  
      this.endY = params["endY"];  
     });
   
    this.http.get<any>
      ('http://localhost:8080/api/employee/viewCompensation?_id='+this.id+"&startM="+this.startM+"&startY="+this.startY
      +"&endM="+this.endM+"&endY="+this.endY,{ 'headers': this.headers })
      .subscribe( employee=>{
        this.response=employee;
 
        this.response.sort((a:any, b:any) => (a.month > b.month ? -1 : 1)); 
        this.response.sort((a:any, b:any) => (a.year < b.year ? -1 : 1));
      
        let z:number = 1;
        let j:number = 0;
        

        for(let i = 0; i<this.response.length;i++){
            if(i==this.response.length-1){
                      if(this.response[i].year!=this.response[i-1].year){
                        this.x=z;
                        j++;
                        j=j+(z-1);
                        this.result.push({year:this.response[i].year,month:this.response[i].month,count:z,identifier:j});
                        z=1;
                      }
                        else if(this.response[i].month == this.response[i-1].month){
                          j++;
                          j=j+(z-1);
                          this.result.push({year:this.response[i].year,month:this.response[i].month,count:z,identifier:j});
                          z++;
                        }
                        else{
                          j++;
                          j=j+(z-1);
                          this.result.push({year:this.response[i].year,month:this.response[i].month,count:z,identifier:j});
                          z=1;
                        }
            }
            else if(this.response[i].year!=this.response[i+1].year){
                j++;
                j=j+(z-1);
                this.result.push({year:this.response[i].year,month:this.response[i].month,count:z,identifier:j});
                z=1;       
            }
                  else if(this.response[i].month == this.response[i+1].month){
                    z++;
                  }
                  else{
                    j++;
                    j=j+(z-1);
                    this.result.push({year:this.response[i].year,month:this.response[i].month,count:z,identifier:j});
                    z=1;
                  }
        }

        for (var val of this.response) {
          this.year.push(val.year);   
        }

        [...new Set(this.year)].forEach(item => this.list.push({
          key: item,
          count: this.year.filter((i:any) => i == item).length
        }));

       this.list.sort((a:any, b:any) => b.year - a.year);
      })


      
    
  }

  goToMonthSelection(id:string){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id": id
      }
    };
    this.router.navigate(['monthSelection'],navigationExtras);
  }
  
  goToHome(){  
    this.router.navigate(['']);
  }
 
    
  goToBreakdown(id:string,year:number,month:number,count:number,iyear:number,imonth:number,fyear:number,fmonth:number,identifier:number){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id": id,
        "year": year,
        "month": month,
        "count": count,
        "iyear": iyear,
        "imonth": imonth,
        "fyear": fyear,
        "fmonth": fmonth,
        "identifier": identifier
      }
    };
    this.router.navigate(['viewCompensationBreakdown'],navigationExtras);
  }

}
