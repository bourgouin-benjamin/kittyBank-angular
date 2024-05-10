import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url: string = 'http://localhost:8080/api/v1/accounts'

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url);
  }

  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.url}/${id}`);
  }

  getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.url}/customer/${customerId}`)
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.url, account);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(this.url, account);
  }

  deleteAccount(id: number): Observable<Account> {
    return this.http.delete<Account>(`${this.url}/${id}`);
  }
}
