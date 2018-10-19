import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {AccountsService} from "../services/accounts.service";
import {Account} from "../domain/account";
import {Observable} from "rxjs";
import {AccountResult} from "../domain/accountResult";
import {GlobalDataService} from "../services/global-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  submitted: boolean = false;
  errorMessage: string = "";
  account: Account;
  private globalDataService: GlobalDataService;

  constructor(private accountService: AccountsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    this.globalDataService = GlobalDataService.getGlobalDataService();
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  onSubmit() {
    this.submitted = true;
    this.checkAccount();
    this.submitted = false;
  }

  moveTo(location: string) {
    this.router.navigate([location]);
  }


  checkAccount() {
    var loginAccount: Account = new Account(this.username, this.password, null);
    console.log('Checking account user: ' + loginAccount.username);
    if ((loginAccount.username == null) || (loginAccount.username.length == 0) ||
      (loginAccount.password == null) || (loginAccount.password.length == 0)) {
      console.log('An account username and password are required');
      this.errorMessage = 'An account username and password are required';
    } else {
      this.getAccount(loginAccount).subscribe(
        (account) => {
          this.account = account;
        },
        err => {
          console.log('getAccounts - error: ', err);
        },
        () => {
          if (this.account) {
            if (this.account) {
              if (this.password == loginAccount.password) {
                console.log("Valid user");
                this.globalDataService.loggedIn = true;
                this.globalDataService.username = this.username;
                this.globalDataService.password = this.password;
                this.moveTo("/app");
              }
            }
          }
        }
      );
    }
  }

  getAccount(account: Account) : Observable<Account> {
    return this.accountService
      .getAccount(account.username);
  }
}
