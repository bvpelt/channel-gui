import { Injectable } from '@angular/core';
import {Channel} from "../domain/channel";

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private _loggedIn: boolean = false;
  private _selectedChannel: Channel = null;
  private _username: string = null;
  private _password: string = null;

  private static globalDataService: GlobalDataService = null;

  private constructor() { }

  public static getGlobalDataService(): GlobalDataService {
    if (this.globalDataService == null) {
      this.globalDataService = new GlobalDataService();
    }

    return this.globalDataService;
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get selectedChannel(): Channel {
    return this._selectedChannel;
  }

  set selectedChannel(value: Channel) {
    this._selectedChannel = value;
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
}
