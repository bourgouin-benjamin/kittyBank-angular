import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CustomersTableComponent } from './components/customers-table/customers-table.component';
import { AccountsTableComponent } from './components/accounts-table/accounts-table.component';
import { AddressTableComponent } from './components/address-table/address-table.component';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CustomersTableComponent,
    AccountsTableComponent,
    AddressTableComponent,
    CustomerFormComponent,
    AccountFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
