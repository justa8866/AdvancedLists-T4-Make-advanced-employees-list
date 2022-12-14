import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SortedProductListComponentModule} from "./components/sorted-product-list/sorted-product-list.component-module";
import {EmployeeServiceModule} from "./services/employee.service-module";
import {SortedProductListComponent} from "./components/sorted-product-list/sorted-product-list.component";

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'employees', component: SortedProductListComponent }]), SortedProductListComponentModule, EmployeeServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
