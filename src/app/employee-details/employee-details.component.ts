import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private service: EmployeeService, private route: ActivatedRoute) { }
  queryParam;
  empDetails: any = {}
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['USERID'];
      this.getEmpDetails(this.queryParam)
    });
  }

  getEmpDetails(USERID) {
    this.service.getEmployeeDetails(USERID).subscribe(res => {
      console.log(res)
      this.lat = res[0].location.split(' ')[0].split(':')[1]
      this.lng = res[0].location.split(' ')[1].split(':')[1]
      this.empDetails = res[0]
    })
  }


}
