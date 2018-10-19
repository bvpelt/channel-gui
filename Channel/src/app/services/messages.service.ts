import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageResult} from "../domain/messageResult";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Channel} from "../domain/channel";
import {ChannelResult} from "../domain/channelResult";
import {Message} from "../domain/message";

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
export class MessagesService {

  private messageUrl = 'http://localhost:8080/messages';

  private messageResult: MessageResult;

  private headers: HttpHeaders = null;

  constructor(private http: HttpClient) {

  }

  makeHeaders(username: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();

    let auth =btoa(username + ":" + password);
    console.log('Authorization: Basic ' + auth);
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");

    return headers;
  }

  getMessages(channel: string, username, password): Observable<MessageResult > {
    var url: string = this.messageUrl + '/channel/' + channel;
    this.log("Get messages using url: " + url);

    this.makeHeaders(username, password);
    return this.http.get<MessageResult>(url, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(MessageResult => this.logRes(MessageResult),
          catchError(this.handleError('getMessageResult', MessageResult))
        ))
  }

  postMessages(newMessage: Message, channel: string, username: string, password: string): Observable<MessageResult > {
    var url: string = this.messageUrl + '/channel/' + channel;
    this.log('postMessages: ' + JSON.stringify(newMessage));

    this.makeHeaders(username, password);
    return this.http.post<MessageResult>(url, newMessage, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(MessageResult => this.logRes(MessageResult),
          catchError(this.handleError('postMessageResult', MessageResult))
        ))
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

  logRes(messageResult: MessageResult) {
    console.log("httpget result: " + JSON.stringify(messageResult));
  }

}
