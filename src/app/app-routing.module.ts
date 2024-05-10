import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AddressTableComponent } from './components/address-table/address-table.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'customers', component:CustomersTableComponent},
  {path:'customerForm/:id', component:CustomerFormComponent},
  {path:'accounts/:customerId', component:AccountsTableComponent},
  {path:'accountForm/:id', component:AccountFormComponent},
  {path:'address', component:AddressTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
