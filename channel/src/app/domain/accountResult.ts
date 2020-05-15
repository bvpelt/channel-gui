import {Account} from "./account";
import {SelfLink} from "./selfLink";

export class AccountResult {
  account: Account[];
  _links: SelfLink;

  constructor (o: AccountResult) {
    this.account = o.account;
    this._links = o._links;
  }
}
