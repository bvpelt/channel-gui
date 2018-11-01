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
import {BaseService} from "./BaseService";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService extends BaseService {

  private channelUrl = 'http://localhost:8080/channels';

  private channelResult: ChannelResult;
  private headers: HttpHeaders = null;

  constructor(private http: HttpClient) {
    super();
  }

  public getChannels(username: string, password: string): Observable<ChannelResult > {
    this.headers = this.makeHeaders(username, password);
    return this.http.get<ChannelResult>(this.channelUrl, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(ChannelResult => this.logRes(ChannelResult),
          catchError(this.handleError('getChannelResult', ChannelResult))
      ))
  }

  public postChannels(newChannel: Channel, username: string, password: string): Observable<ChannelResult > {
    this.headers = this.makeHeaders(username, password);
    console.log('postChannels: ', JSON.stringify(newChannel));
    return this.http.post<ChannelResult>(this.channelUrl, newChannel, { withCredentials: true, headers: this.headers })
      .pipe(
        tap(ChannelResult => this.logRes(ChannelResult),
          catchError(this.handleError('postChannelResult', ChannelResult))
        ))
  }

  public removeChannel(channel: Channel, username: string, password: string): Observable<ChannelResult> {
    console.log('removeChannel: ', JSON.stringify(channel));
    this.headers = this.makeHeaders(username, password);
    if (channel == null || channel.name == null || channel.name.length == 0) {
      console.error('Channel is invalid: ', JSON.stringify(channel));
      return null;
    } else {
      return this.http.delete<ChannelResult>(this.channelUrl + '/' + channel.name, { withCredentials: true, headers: this.headers });
    }
  }

}
