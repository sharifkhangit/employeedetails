import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  constructor(private router: Router, private service: EmployeeService) { }
  employeeList: any = []
  ngOnInit(): void {
    this.service.getPosition().then(pos => {
      console.log(`${pos.lng} ${pos.lat}`);
    });

    this.service.getEmployeeList().subscribe(res => {
      console.log(res)
      this.employeeList = res;
    })
  }
  addEmployeeShow() {
    this.router.navigate(['employee-add'])
  }

  getEmpDetails(employee) {
    this.router.navigate(['employee-details'], { queryParams: { USERID: employee.id } });
  }
}
