import {SelfLink} from "./selfLink";

export class Account {
  public username: string;
  public password: string;
  public key: string;

  public links: SelfLink;

  constructor(username: string, password:string, links: SelfLink) {
    this.username = username;
    this.password = password;
    this.links = links;
  }


}
