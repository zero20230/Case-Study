import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { AddMonthlyCComponent } from './components/add-monthly-c/add-monthly-c.component';
import { MonthSelectionComponent } from './components/month-selection/month-selection.component';
import { ViewCompensationHComponent } from './components/view-compensation-h/view-compensation-h.component';
import { ViewCompensationBreakdownComponent } from './components/view-compensation-breakdown/view-compensation-breakdown.component';
import { EditCompensationComponent } from './components/edit-compensation/edit-compensation.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AddEmployeeComponent,
    NavbarComponent,
    SearchEmployeesComponent,
    EditEmployeeComponent,
    ViewEmployeeComponent,
    AddMonthlyCComponent,
    MonthSelectionComponent,
    ViewCompensationHComponent,
    ViewCompensationBreakdownComponent,
    EditCompensationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
