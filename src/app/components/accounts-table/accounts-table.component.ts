import { Component, OnInit } from '@angular/core';
import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';
import { NgForm } from '@angular/forms';
import { Observer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.css'
})
export class AccountsTableComponent implements OnInit{
  accounts: Account[] = [];
  customerId: number = 0;
  isSearchOn: boolean = false;
  errorMessage: string = '';

  constructor(private service: AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customerId = params['customerId'];

      if(this.customerId == 0) {
        this.getAllAccount();
      } else {
        this.searchByCustomerId(this.customerId);
      }
    })
  }

  getAllAccount(): void {
    this.service.getAccounts().subscribe(res => {
      this.accounts = res;
    })
  }

  handleFormSubmit(form: NgForm): void {
    this.searchByCustomerId(form.value.customerId);
  }

  searchByCustomerId(id: number): void {
    let observer: Observer<Account[]> = {
      next: (res) => {
        this.accounts = [];
        this.accounts = res;
        this.errorMessage = '';
        this.isSearchOn = true;
      }, 
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            this.errorMessage = `Customer with id ${id} not found.`;
            break;
          default:
            console.log(error);
        }
      },
      complete: () => console.log('End of operation.')
    }
    this.service.getAccountsByCustomerId(id).subscribe(observer);
  }

  handleOnCancelSearchButtonClick() {
    this.isSearchOn = false;
    this.getAllAccount();
  }

  deleteAccount(id: number) {
    let observer: Observer<Account> = {
      next: (res) => {
        this.errorMessage = '';
        this.isSearchOn = false;
        this.getAllAccount();
      },
      error: (error: HttpErrorResponse) => {
        switch(error.status){
          case 404:
            this.errorMessage = `Account with id ${id} not found.`;
            break;
          case 500:
            this.errorMessage = 'An error has occured, please try again later.';
            break;
          default:
            console.log('End of operation.')
        }
      },
      complete: () => console.log('End of operation.')
    }
    this.service.deleteAccount(id).subscribe(observer);
  }
}
