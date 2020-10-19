import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });

  }
  getEmployeeList() {
    return this.http.get('https://5f8ac4f384531500167061ed.mockapi.io/employee/employee')
  }

  saveDetails(values) {
    return this.http.post('https://5f8ac4f384531500167061ed.mockapi.io/employee/employee', values)
  }
  getEmployeeDetails(id) {
    return this.http.get('https://5f8ac4f384531500167061ed.mockapi.io/employee/employee?id=' + id)
  }
}
