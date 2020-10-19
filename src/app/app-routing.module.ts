import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';


const routes: Routes = [{ path: '', redirectTo: 'employee-list', pathMatch: 'full' },
{ path: 'employee-list', component: EmployeeListComponent },
{ path: 'employee-details', component: EmployeeDetailsComponent },
{ path: 'employee-add', component: AddEmployeeComponent }


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
