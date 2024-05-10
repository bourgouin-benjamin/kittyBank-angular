import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../model/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit{
  id: number = 0;
  regex: RegExp = /[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d/;
  customer: Customer = {
    customerId: 0,
    name: '',
    customerType: '',
    address: {
        customerId: 0,
        addressId: 0,
        streetNumber:"",
        city: "",
        province: '',
        postalCode: '',
    },
    accounts: []
  };
  errorMessage: string = '';

  constructor(private service: CustomerService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];

        if(this.id != 0){
          this.service.getCustomerById(this.id).subscribe(res => {
            this.customer = res;
          })
        }
      }
    )
  }

  handleData(form: NgForm): void {
    if(this.id == 0) {
      this.addCustomer(form.value);
    } else {
      this.updateCustomer(form.value);
    }
  }

  addCustomer(value: any): void {
    this.customer.name = value.name;
    this.customer.customerType = value.customerType;
    this.customer.address.streetNumber = value.streetNumber;
    this.customer.address.postalCode = value.postalCode;

    let observer: Observer<Customer> = {
      next: (res) => {
        this.errorMessage = '';
        this.router.navigate(['/customers'])
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status) {
          case 500:
            this.errorMessage = "An error has occured, please retry later";
            break;
          default: 
            console.log(error);
        }
      },
      complete: () => console.log("End of operation.")
    }

    this.service.addCustomer(this.customer).subscribe(observer);
  }

  updateCustomer(value: any): void {
    this.customer.name = value.name;
    this.customer.address.city = value.city;
    this.customer.address.postalCode = value.postalCode;
    this.customer.address.province = value.province;

    let observer: Observer<Customer> = {
      next: (res) => {
        this.errorMessage = '';
        this.router.navigate(['/customers']);
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            this.errorMessage = `Customer with id ${this.id} not found`;
            break;
          case 500:
            this.errorMessage = "An error has occured, please retry later";
            break;
          default:
            console.log(error);
        }
      },
      complete: () => console.log('End of operation.')
    }

    this.service.updateCustomer(this.customer).subscribe(observer);
  }
}
