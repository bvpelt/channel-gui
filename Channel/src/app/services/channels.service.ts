import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
/*
import { CHANNELS } from './mock-channels';
import { Channel } from './channel';
*/
import {ChannelResult} from "../domain/channelResult";
import {Channel} from "../domain/channel";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private channelUrl = 'http://localhost:8080/channels';

  private channelResult: ChannelResult;
  private headers: HttpHeaders = null;

  constructor(private http: HttpClient) {
    //this.headers = this.makeHeaders();
  }

  makeHeaders(username: string, password: string): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    //let username = "admin";
    //let password = "geheim";
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/json; charset=utf-8");
    headers.append("Mydata", "debug");

    return headers;
  }

  getChannels(username: string, password: string): Observable<ChannelResult > {
    this.makeHeaders(username, password);
    return this.http.get<ChannelResult>(this.channelUrl, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(ChannelResult => this.logRes(ChannelResult),
          catchError(this.handleError('getChannelResult', ChannelResult))
      ))
  }

  postChannels(newChannel: Channel, username: string, password: string): Observable<ChannelResult > {
    this.makeHeaders(username, password);
    console.log('postChannels: ', JSON.stringify(newChannel));
    return this.http.post<ChannelResult>(this.channelUrl, newChannel, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(ChannelResult => this.logRes(ChannelResult),
          catchError(this.handleError('postChannelResult', ChannelResult))
        ))
  }

  removeChannel(channel: Channel, username: string, password: string): Observable<ChannelResult> {
    console.log('removeChannel: ', JSON.stringify(channel));
    this.makeHeaders(username, password);
    if (channel == null || channel.name == null || channel.name.length == 0) {
      console.error('Channel is invalid: ', JSON.stringify(channel));
      return null;
    } else {
      return this.http.delete<ChannelResult>(this.channelUrl + '/' + channel.name, { withCredentials: true, headers: this.headers });
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

  logRes(channelResult: ChannelResult) {
    console.log("httpget result: " + JSON.stringify(channelResult));
  }
}
