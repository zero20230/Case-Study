import { Component, OnInit } from '@angular/core';
import { Router ,NavigationExtras} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {  FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-month-selection',
  templateUrl: './month-selection.component.html',
  styleUrls: ['./month-selection.component.css']
})
export class MonthSelectionComponent implements OnInit {
  private sub: any;
  id:any;
  selectMonthForm :FormGroup;


  constructor( private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.selectMonthForm = new FormGroup({
      'startM' : new FormControl(null),
      'startY' : new FormControl(null),
      'endM' : new FormControl(null),
      'endY' : new FormControl(null),
    })

    this.sub = this.route.queryParams.subscribe(params => {
      this.id = params["_id"];  
     });
     
  }

  OnSubmit(){  
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "_id":this.id,
        "startM" : this.selectMonthForm.value.startM,
        "startY" : this.selectMonthForm.value.startY,
        "endM" : this.selectMonthForm.value.endM,
        "endY" : this.selectMonthForm.value.endY,
      }
    };

    if((this.selectMonthForm.value.startM>this.selectMonthForm.value.endM)&&(this.selectMonthForm.value.startY==this.selectMonthForm.value.endY)){
      window.alert("Start month can't be greater than end month")
    }
    else if(this.selectMonthForm.value.startY>this.selectMonthForm.value.endY){
      window.alert("Start year can't be greater than end year")
    }
    else if(typeof this.selectMonthForm.value.startY!='number'|| typeof this.selectMonthForm.value.endY !='number'){
      window.alert("Year must be a number")
    }
    else if(this.selectMonthForm.value.startY>2099||this.selectMonthForm.value.startY<1900
      ||this.selectMonthForm.value.endY>2099||this.selectMonthForm.value.endY<1900){
        window.alert("Year can't be greater than 2099 or lower than 1900")
    }
    else{
      this.router.navigate(['viewCompensationH'],navigationExtras);
    }
  
  }
    
}
