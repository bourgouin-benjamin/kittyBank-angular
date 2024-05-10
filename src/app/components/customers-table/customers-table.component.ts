import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer';
import { CustomerService } from '../../services/customer.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.css'
})
export class CustomersTableComponent implements OnInit{
  customers: Customer[] = [];
  isSearchOn: boolean = false;
  errorMessage: string = '';

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(): void {
    this.service.getCustomers().subscribe(res => {
        this.customers = res;
      }
    )
  }

  searchById(form: NgForm): void {
    let observer: Observer<Customer> = {
      next: (res) => {
        this.customers = [];
        this.customers.push(res);
        this.isSearchOn = true;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            this.errorMessage = `Customer with id ${form.value.customerId} not found.`
            break;
          default:
            console.log(error);
        }
      },
      complete: () => console.log("End of operation.")
    }
    this.service.getCustomerById(form.value.customerId).subscribe(observer);
  }

  handleOnCancelSearchButtonClick() {
    this.getAllCustomers();
    this.isSearchOn = false;
  }

  deleteCustomer(customerId: number): void {
    let observer: Observer<Customer> = {
      next: (res) => {
        this.getAllCustomers();
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            this.errorMessage = `Customer with id ${customerId} not found.`
            break;
          case 500:
            this.errorMessage = `An error has occured, please retry later.`
            break;
          default:
            console.log(error);
        }
      },
      complete: () => console.log('End of operation.')
    }
    this.service.deleteCustomer(customerId).subscribe(observer);
  }
}
