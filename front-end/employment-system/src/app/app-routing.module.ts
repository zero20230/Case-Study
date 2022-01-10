import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddMonthlyCComponent } from './components/add-monthly-c/add-monthly-c.component';
import { EditCompensationComponent } from './components/edit-compensation/edit-compensation.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { IndexComponent } from './components/index/index.component';
import { MonthSelectionComponent } from './components/month-selection/month-selection.component';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { ViewCompensationBreakdownComponent } from './components/view-compensation-breakdown/view-compensation-breakdown.component';
import { ViewCompensationHComponent } from './components/view-compensation-h/view-compensation-h.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
  {path:'addEmployee',component:AddEmployeeComponent},
  {path:'searchEmployees',component:SearchEmployeesComponent},
  {path:'editEmployees',component:EditEmployeeComponent},
  {path:'viewEmployees',component:ViewEmployeeComponent},
  {path:'addCompensation',component:AddMonthlyCComponent},
  {path:'monthSelection',component:MonthSelectionComponent},
  {path:'viewCompensationH',component:ViewCompensationHComponent},
  {path:'viewCompensationBreakdown',component:ViewCompensationBreakdownComponent},
  {path:'editCompensation',component:EditCompensationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
