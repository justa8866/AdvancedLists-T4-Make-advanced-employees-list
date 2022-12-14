import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { EmployeeModel } from '../models/employee.model';
import {EmployeeResponse} from "./employee.response";
import {ApiResponse} from "./api.response";

@Injectable()
export class EmployeeService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<EmployeeModel[]> {
    return this._httpClient
      .get<ApiResponse<EmployeeResponse[]>>('/api/v1/employees')
      .pipe(
        map((response: ApiResponse<EmployeeResponse[]>) => {
          return response.data.map((employeeResponse: EmployeeResponse) => {
            return {
              personalNumber: employeeResponse.id,
              name: employeeResponse.employee_name,
              img: employeeResponse.profile_image,
              salary: parseInt(employeeResponse.employee_salary,10),
              age: parseInt(employeeResponse.employee_age, 10),
            };
          });
        })
      );
  }
}
