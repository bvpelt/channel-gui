import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Channel} from "../domain/channel";
import {ChannelchangedService} from "../services/channelchanged.service";
import * as FileSaver from "file-saver";
import {MessagesService} from "../services/messages.service";
import {Observable} from "rxjs";
import {MessageResult} from "../domain/messageResult";
import {Message} from "../domain/message";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-channel-app',
  templateUrl: './channel-app.component.html',
  styleUrls: ['./channel-app.component.css']
})
export class ChannelAppComponent implements OnInit {
  public title = 'Channel';
  private channelChangedService: ChannelchangedService;

  public selectedChannel: Channel = null;
  private _messageResult: MessageResult;
  private _messages: Message[];


  constructor(private route: ActivatedRoute,
              private location: Location,
              private messagesService: MessagesService)
  {
    this.channelChangedService = ChannelchangedService.getChannelService();
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
    this.channelChangedService.setSelectedChannel(channel);
    console.log('APP - Selected channel: ' + channel.name);
  }

  getMessages(channel: string): Observable<MessageResult> {
    return this.messagesService
      .getMessages(channel);
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
