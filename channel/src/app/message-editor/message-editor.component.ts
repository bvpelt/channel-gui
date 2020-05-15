import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {Observable} from "rxjs";

import {Channel} from "../domain/channel";
import {Message} from "../domain/message";
import {MessageResult} from "../domain/messageResult";
import {ChannelResult} from "../domain/channelResult";
import {ChannelsService} from "../services/channels.service";
import {MessagesService} from "../services/messages.service";
import {ChannelchangedService} from "../services/channelchanged.service";
import {GlobalDataService} from "../services/global-data.service";

@Component({
  selector: 'app-message-editor',
  templateUrl: './message-editor.component.html',
  styleUrls: ['./message-editor.component.css']
})
export class MessageEditorComponent implements OnInit {
  public  newMessage: Message = new Message('', '',0,null);
  private messageResult: MessageResult;
  private savedMessage: Message;
  //private channelChangedService: ChannelchangedService;
  private submitted: boolean = false;
  public errorMessage: string;
  private globalDataService: GlobalDataService = null;
  private appLocation: string = '/app';

  selectedChannel: Channel = null;

  constructor(private messagesService: MessagesService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
    // this.channelChangedService = ChannelchangedService.getChannelService();
    this.globalDataService = GlobalDataService.getGlobalDataService();
    if (this.globalDataService.loggedIn == false) {
      this.moveTo("/login");
    }
  }

  goBack(): void {
    this.location.back();
  }

  moveTo(location: string) {
    this.router.navigate([location]);
  }

  ngOnInit() {
    this.selectedChannel = this.globalDataService.selectedChannel; //this.channelChangedService.getSelectedChannel();
    console.log("MESSAGE-EDITOR ngInit selected Channel: ", (this.selectedChannel == null? '': this.selectedChannel.name));
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  onSubmit() {
    this.addMessage();
    this.submitted = true;
  }

  addMessage() {
    console.log('Creating Message: ' + JSON.stringify(this.newMessage));

    if ((this.newMessage.message == null) || (this.newMessage.message.length == 0)) {
      console.log('A message is required');
      this.errorMessage = 'A message is required';
    } else {
      var username = this.globalDataService.username;
      var password = this.globalDataService.password;
      this.postMessage(this.newMessage, this.selectedChannel.name, username, password).subscribe(
        (messageResult) => {
          this.messageResult = messageResult;
        },
        err => {
          console.log('getMessage - error: ', err);
        },
        () => {
          if (this.messageResult) {
            if (this.messageResult.message) {
              this.savedMessage = this.messageResult.message[0];
              console.log("Saved errorMessage: ", this.savedMessage);
              this.moveTo(this.appLocation);
            }
          }
          this.newMessage = new Message('', '', 0, null);
        }
      );
    }
  }

  postMessage(message: Message, channel: string, username, password) : Observable<MessageResult> {
    return this.messagesService
      .postMessages(this.newMessage, channel, username, password);
  }

}
