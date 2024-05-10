import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { AccountService } from '../../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observer } from 'rxjs';
import { Account } from '../../model/account';
import { HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit{
  customers: Customer[] = [];
  id: number = 0;
  account: Account = {
    customerId: 0,
    accountId: 0,
    accountType: '',
    balance: 0,
    nextCheckNumber: 0,
    interestRate: 0
  }
  errorMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      if(this.id != 0) {
        this.accountService.getAccountById(this.id).subscribe(res => {
          this.account = res;
        })
      } else {
        this.getCustomersId();
      }
    })
  }

  getCustomersId(): void {
    this.customerService.getCustomers().subscribe(res => {
      this.customers = res;
    })
  }

  handleData(form: NgForm) {
    if(this.id == 0){
      this.addAccount(form.value);
    } else {
      this.updateAccount(form.value);
    }
  }

  addAccount(value: any) {
    this.account.customerId = value.customerId;
    this.account.accountType = value.accountType;
    this.account.balance = value.balance;
    if(value.accountType == 'SAVINGS') {
      this.account.interestRate = value.interestRate;
    }

    let observer: Observer<Account> = {
      next: (res) => {
        this.errorMessage = '';
        this.router.navigate(['/accounts/0']);
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status) {
          case 500:
            this.errorMessage = 'An error has occured, please try again later.';
            break;
          default:
            console.log(error);
            break;
        }
      }, 
      complete: () => console.log('End of operation.')
    }
    this.accountService.addAccount(this.account).subscribe(observer);
  }

  updateAccount(value: any) {
    this.account.balance = value.balance;
    if(this.account.accountType == 'SAVINGS') {
      this.account.interestRate = value.interestRate;
    }

    let observer: Observer<Account> = {
      next: (res) => {
        this.errorMessage = '';
        this.router.navigate(['/accounts/0']);
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status) {
          case 404:
            this.errorMessage = `Account with id ${this.account.accountId} not found.`;
            break;
          case 500: 
            this.errorMessage = 'An error has occured, please retry later';
            break;
          default: 
            console.log(error);
            break;
        }
      },
      complete: () => console.log('End of operation.')
    }
    this.accountService.updateAccount(this.account).subscribe(observer);
  }
}
