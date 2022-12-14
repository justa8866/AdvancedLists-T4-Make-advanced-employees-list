import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, combineLatest, filter, map, Observable, of, Subject} from 'rxjs';
import {EmployeeModel} from "../../models/employee.model";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-sorted-product-list',
  templateUrl: './sorted-product-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortedProductListComponent {

  private _orderSubject: BehaviorSubject<string> = new BehaviorSubject<string>('asc');

  arr: string[] = ['All','0-20','21-30','31-40','41-50','51-100'];
  selectedSortType: string = this.arr[1];

  public order$: Observable<string> = this._orderSubject.asObservable();

  public orders: Observable<string[]> = of(['asc', 'desc'])

  constructor(private _employeeService: EmployeeService) {

  }

  sort(order: string): void {
    this._orderSubject.next(order);
  }

  filter(item: string) {
    this.selectedSortType = item;
    this.products$ = combineLatest([this.employees$,
      this.order$
    ]).pipe(
      map(([employees, order] : [EmployeeModel[], string]) => {
        switch (this.selectedSortType) {
          case this.arr[0]:
            return this.sortByOrder(employees, order);

          case this.arr[1]:
            return this.sortByOrder(employees.filter(employee => employee.age < 21), order);

          case this.arr[2]:
            return this.sortByOrder(employees.filter(employee => employee.age >= 21 && employee.age < 31), order);

          case this.arr[3]:
            return this.sortByOrder(employees.filter(employee => employee.age >= 31 && employee.age < 41), order);

          case this.arr[4]:
            return this.sortByOrder(employees.filter(employee => employee.age >= 41 && employee.age < 51), order);

          case this.arr[5]:
            return this.sortByOrder(employees.filter(employee => employee.age >= 51 && employee.age < 101), order);

          default:
            return this.sortByOrder(employees, order);
        }
      }))
  }

  sortByOrder(employees: EmployeeModel[], order: string) {
    return employees.sort((a,b) => {
      if(a.salary > b.salary) return order === 'asc' ? 1 : -1;
      if(a.salary < b.salary) return order === 'asc' ? -1 : 1;
      return 0;
    })
  }

  readonly employees$: Observable<EmployeeModel[]> = this._employeeService.getAll();
  products$: Observable<EmployeeModel[]> =  combineLatest([this.employees$,
    this.order$
  ]).pipe(
    map(([employees, order] : [EmployeeModel[], string]) => this.sortByOrder(employees, order) ));


}
