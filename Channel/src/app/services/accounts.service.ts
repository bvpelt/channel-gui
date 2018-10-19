import { Injectable } from '@angular/core';
import {ChannelResult} from "../domain/channelResult";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Account} from "../domain/account";
import {AccountResult} from "../domain/accountResult";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
    //this.headers = this.makeHeaders();
    this.systemHeaders = this.makeSystemHeaders();
  }

  private channelUrl = 'http://localhost:8080/accounts';

  private accountResult: AccountResult;
  private headers: HttpHeaders = null;
  private systemHeaders: HttpHeaders = null;


  makeHeaders(username: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    //let username = "admin";
    //let password = "geheim";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");
    headers.append("Mydata", "debug");

    return headers;
  }

  makeSystemHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    let username = "system";
    let password = "ditisgeheim";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");
    headers.append("Mydata", "debug");

    return headers;
  }

  getAccounts(username: string, password: string): Observable<AccountResult > {
    this.makeHeaders(username, password);
    return this.http.get<AccountResult>(this.channelUrl, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(AccountResult => this.logRes(AccountResult),
          catchError(this.handleError('getAccountResult', AccountResult))
        ))
  }

  getAccount(username: String): Observable<Account> {

    return this.http.get<Account>(this.channelUrl + '/' + username, { withCredentials: true, headers: this.systemHeaders })
      .pipe(
        tap(Account => this.logResAccount(Account),
          catchError(this.handleError('getAccount', Account))
        ))
  }

  postAccounts(newAccount: Account, username: string, password: string): Observable<AccountResult > {
    this.log('postAccounts: ' + JSON.stringify(newAccount));
    this.makeHeaders(username, password);
    return this.http.post<AccountResult>(this.channelUrl, newAccount, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(AccountResult => this.logRes(AccountResult),
          catchError(this.handleError('postAccountResult', AccountResult))
        ))
  }

  removeAccount(account: Account, username: string, password: string): Observable<AccountResult> {
    this.log('removeAccount: ' + JSON.stringify(account));
    this.makeHeaders(username, password);
    if (account == null || account.username == null || account.username.length == 0) {
      console.error('Account is invalid: ', JSON.stringify(account));
      return null;
    } else {
      return this.http.delete<AccountResult>(this.channelUrl + '/' + account.username, { withCredentials: true, headers: this.headers });
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string) {
    console.log(message);
  }

  logRes(accountResult: AccountResult) {
    console.log("httpget result: " + JSON.stringify(accountResult));
  }

  logResAccount(account: Account) {
    console.log("httpget result: " + JSON.stringify(account));
  }
}
