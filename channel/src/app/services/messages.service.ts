import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageResult} from "../domain/messageResult";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Channel} from "../domain/channel";
import {ChannelResult} from "../domain/channelResult";
import {Message} from "../domain/message";
import {BaseService} from "./BaseService";

/*
const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    }
  )
};
*/

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends BaseService {

  private messageUrl = 'http://localhost:8080/messages';

  private messageResult: MessageResult;

  private headers: HttpHeaders = null;

  constructor(private http: HttpClient) {
    super();
  }

  public getMessages(channel: string, username, password): Observable<MessageResult > {
    var url: string = this.messageUrl + '/channel/' + channel;
    this.log("Get messages using url: " + url);

    this.headers = this.makeHeaders(username, password);
    return this.http.get<MessageResult>(url, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(MessageResult => this.logRes(MessageResult),
          catchError(this.handleError('getMessageResult', MessageResult))
        ))
  }

  postMessages(newMessage: Message, channel: string, username: string, password: string): Observable<MessageResult > {
    var url: string = this.messageUrl + '/channel/' + channel;
    this.log('postMessages: ' + JSON.stringify(newMessage));

    this.headers = this.makeHeaders(username, password);
    return this.http.post<MessageResult>(url, newMessage, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(MessageResult => this.logRes(MessageResult),
          catchError(this.handleError('postMessageResult', MessageResult))
        ))
  }

}
