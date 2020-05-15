import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {AccountsService} from "../services/accounts.service";
import {Account} from "../domain/account";
import {Observable} from "rxjs";
import {GlobalDataService} from "../services/global-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _username: string;
  private _password: string;
  private _submitted: boolean = false;
  private _errorMessage: string = "";
  private account: Account;
  private globalDataService: GlobalDataService;

  constructor(private accountService: AccountsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    this.globalDataService = GlobalDataService.getGlobalDataService();
  }

  public ngOnInit() {
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get submitted(): boolean {
    return this._submitted;
  }

  set submitted(value: boolean) {
    this._submitted = value;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }

  public goBack(): void {
    this.location.back();
  }

  public clearErrorMessage() {
    this._errorMessage = '';
  }

  public onSubmit() {
    this._submitted = true;
    this.checkAccount();
    this._submitted = false;
  }

  public moveTo(location: string) {
    this.router.navigate([location]);
  }

  private checkAccount() {
    var loginAccount: Account = new Account(this._username, this._password, null);
    console.log('Checking account user: ' + loginAccount.username);
    if ((loginAccount.username == null) || (loginAccount.username.length == 0) ||
      (loginAccount.password == null) || (loginAccount.password.length == 0)) {
      console.log('An account username and password are required');
      this._errorMessage = 'An account username and password are required';
    } else {
      this.getAccount(loginAccount).subscribe(
        (account) => {
          this.account = account;
        },
        err => {
          console.log('getAccounts - error: ', err);
          this._errorMessage = 'Invalid username: ' + this._username;
          this.moveTo("/login");
        },
        () => {
          if (this.account) {
            if (this._password == loginAccount.password) {
              console.log("Valid user");
              this.globalDataService.loggedIn = true;
              this.globalDataService.username = this._username;
              this.globalDataService.password = this._password;
              this.moveTo("/app");
            }
          }
        }
      );
    }
  }

  private getAccount(account: Account): Observable<Account> {
    return this.accountService
      .getAccount(account.username);
  }
}
