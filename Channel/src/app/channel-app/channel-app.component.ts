import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from "rxjs";
import * as FileSaver from "file-saver";

import {Channel} from "../domain/channel";
import {MessagesService} from "../services/messages.service";
import {MessageResult} from "../domain/messageResult";
import {Message} from "../domain/message";
import {GlobalDataService} from "../services/global-data.service";

@Component({
  selector: 'app-channel-app',
  templateUrl: './channel-app.component.html',
  styleUrls: ['./channel-app.component.css']
})
export class ChannelAppComponent implements OnInit {
  public title = 'Channel';

  public selectedChannel: Channel = null;
  private _messageResult: MessageResult;
  private _messages: Message[];

  private globalDataService: GlobalDataService;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private messagesService: MessagesService)
  {
    this.globalDataService = GlobalDataService.getGlobalDataService();
  }

  ngOnInit() {
  }

  public getChannelName(): string {
    if (this.selectedChannel != null && this.selectedChannel != undefined) {
      return this.selectedChannel.name;
    } else {
      return '';
    }
  }

  public onChannelChanged(channel: Channel) {
    this.selectedChannel = channel;
    this.globalDataService.selectedChannel = channel;
    console.log('APP - Selected channel: ' + channel.name);
  }

  getMessages(channel: string): Observable<MessageResult> {
    var username = this.globalDataService.username;
    var password = this.globalDataService.password;
    return this.messagesService
      .getMessages(channel, username, password);
  }


  exportMessage() {
    // Retrieve data
    console.log("exportMessage - retrieve data");
    if (this.selectedChannel) {
      this.getMessages(this.selectedChannel.name).subscribe(
        (messageResult) => {
          this._messageResult = messageResult;
          console.log("getMessages: -after call " + this._messageResult);
        },
        err => {
          console.log('getMessages - error: ', err);
        },
        () => {
          this._messages = this._messageResult.message;
          console.log('getMessages - completed: ' + JSON.stringify(this._messages));
          console.log('exportMessage - set headers');
          // Set headers
          let content_type = 'application/json;charset=UTF-8';
          let x_filename = this.selectedChannel.name + '.json';

          var data: string = JSON.stringify(this._messages);
          console.log('getMessages - completed data: ', data);
          var blob = new Blob([data], {type: content_type});
          FileSaver.saveAs(blob, x_filename);
          console.log("exportMessage - ready");
        }
      );
    }


  }
}
