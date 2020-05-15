import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from "rxjs";

import {AccountsService} from "../services/accounts.service";
import {Account} from "../domain/account";
import {AccountResult} from "../domain/accountResult";
import {GlobalDataService} from "../services/global-data.service";

@Component({
  selector: 'app-account-editor',
  templateUrl: './account-editor.component.html',
  styleUrls: ['./account-editor.component.css']
})
export class AccountEditorComponent implements OnInit {

  public newAccount: Account = new Account('', '', null);
  private accountResult: AccountResult;
  private savedAccount: Account;
  private submitted: boolean = false;
  public errorMessage: string;
  private userName: string;
  private password: string;
  private globalDataService: GlobalDataService;

  constructor(private accountService: AccountsService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
    this.globalDataService = GlobalDataService.getGlobalDataService();
    if (this.globalDataService.loggedIn == false) {
      this.moveTo("/login");
    }
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  moveTo(location: string) {
    this.router.navigate([location]);
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  onSubmit() {
    this.submitted = true;
    this.addAccount();
    this.submitted = false;
  }

  addAccount() {
    console.log('Creating account user: ' + this.newAccount.username);
    if ((this.newAccount.username == null) || (this.newAccount.username.length == 0) ||
      (this.newAccount.password == null) || (this.newAccount.password.length == 0)) {
      console.log('An account username and password are required');
      this.errorMessage = 'An account username and password are required';
    } else {
      this.postAccount(this.newAccount).subscribe(
        (accountResult) => {
          this.accountResult = accountResult;
        },
        err => {
          console.log('getAccounts - error: ', err);
        },
        () => {
          if (this.accountResult) {
            if (this.accountResult.account) {
              this.savedAccount = this.accountResult.account[0];
              console.log("Saved account: ", this.savedAccount);
            }
          }
          this.newAccount = new Account('', '', null);
        }
      );
    }
  }

  postAccount(account: Account): Observable<AccountResult> {
    let username: string = this.globalDataService.username;
    let password: string = this.globalDataService.password;
    console.log('postAccount new account with name: ', account.username, ' using account: ', username);
    return this.accountService
      .postAccounts(this.newAccount, username, password);
  }


}
