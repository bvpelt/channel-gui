import { Injectable } from '@angular/core';
import {ChannelResult} from "../domain/channelResult";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Account} from "../domain/account";
import {AccountResult} from "../domain/accountResult";
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class AccountsService extends BaseService {

  constructor(private http: HttpClient) {
    super();

    this.systemHeaders = this.makeSystemHeaders();
  }

  private channelUrl = 'http://localhost:8080/accounts';

  private accountResult: AccountResult;
  private headers: HttpHeaders = null;
  private systemHeaders: HttpHeaders = null;

  public getAccounts(username: string, password: string): Observable<AccountResult > {
    this.headers = this.makeHeaders(username, password);
    return this.http.get<AccountResult>(this.channelUrl, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(AccountResult => this.logRes(AccountResult),
          catchError(this.handleError('getAccountResult', AccountResult))
        ))
  }

  public getAccount(username: String): Observable<Account> {
    return this.http.get<Account>(this.channelUrl + '/' + username, { withCredentials: true, headers: this.systemHeaders })
      .pipe(
        tap(Account => this.logRes(Account),
          catchError(this.handleError('getAccount', Account))
        ))
  }

  public postAccounts(newAccount: Account, username: string, password: string): Observable<AccountResult > {
    this.log('postAccounts: ' + JSON.stringify(newAccount));
    this.headers = this.makeHeaders(username, password);
    return this.http.post<AccountResult>(this.channelUrl, newAccount, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(AccountResult => this.logRes(AccountResult),
          catchError(this.handleError('postAccountResult', AccountResult))
        ))
  }

  public removeAccount(account: Account, username: string, password: string): Observable<AccountResult> {
    this.log('removeAccount: ' + JSON.stringify(account));
    this.headers =  this.makeHeaders(username, password);
    if (account == null || account.username == null || account.username.length == 0) {
      console.error('Account is invalid: ', JSON.stringify(account));
      return null;
    } else {
      return this.http.delete<AccountResult>(this.channelUrl + '/' + account.username, { withCredentials: true, headers: this.headers });
    }
  }

}
