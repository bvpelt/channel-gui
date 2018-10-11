import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";

import {MessagesService} from "../services/messages.service";
import {Channel} from "../domain/channel";
import {Message} from "../domain/message";
import {MessageResult} from "../domain/messageResult";
import {ChannelchangedService} from "../services/channelchanged.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  private channelChangedService: ChannelchangedService;
  private _messageResult: MessageResult;
  private _messages: Message[];
  private _channel: Channel = null;

  @Input()
  set channel(channel: Channel) {
    this._channel = channel;
    if (channel) {
      console.log('MESSAGES - Received channel: ' + channel.name);
      this.getMessages(this._channel.name).subscribe(
        (messageResult) => {
          this._messageResult = messageResult;
          console.log("getMessages: -after call " + this._messageResult);
        },
        err => {
          console.log('getMessages - error: ', err);
        },
        () => {
          this._messages = this._messageResult.message;
          console.log('getMessages - completed: ' + this._messages);
        }
      );
    } else {
      console.log('MESSAGES - Received channel: undefined');
    }
  }

  get channel(): Channel {
    return this._channel;
  }

  constructor(private messagesService: MessagesService) {
    this.channelChangedService = ChannelchangedService.getChannelService();
  }

  get messages(): Message[] {
    return this._messages;
  }

  set messages(value: Message[]) {
    this._messages = value;
  }

  ngOnInit() {
    console.log('getMessages: start');
    if (this._channel) {
      this.getMessages(this._channel.name).subscribe(
        (messageResult) => {
          this._messageResult = messageResult;
          console.log("getMessages: -after call " + this._messageResult);
        },
        err => {
          console.log('getMessages - error: ', err);
        },
        () => {
          this._messages = this._messageResult.message;
          console.log('getMessages - completed: ' + this._messages);
        }
      );
    }
  }

  getMessages(channel: string): Observable<MessageResult> {
    return this.messagesService
      .getMessages(channel);
  }

  logRes(prefix: string, messageResult: MessageResult) {
    if (messageResult != null) {
      console.log(prefix + 'getMessages from service result: ' + JSON.stringify(messageResult));
    } else {
      console.log(prefix + 'empty result');
    }
  }
}