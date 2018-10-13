import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Channel} from "../domain/channel";
import {ChannelsService} from "../services/channels.service";
import {Observable} from "rxjs";
import {ChannelResult} from "../domain/channelResult";

@Component({
  selector: 'app-channel-editor',
  templateUrl: './channel-editor.component.html',
  styleUrls: ['./channel-editor.component.css']
})
export class ChannelEditorComponent implements OnInit {

  public  newChannel: Channel = new Channel('', null);
  private channelResult: ChannelResult;
  private savedChannel: Channel;
  private submitted: boolean = false;
  public errorMessage: string;

  constructor(private channelsService: ChannelsService,
              private route: ActivatedRoute,
              private location: Location) {
    this.errorMessage = '';
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  onSubmit() {
    this.addChannel();
    this.submitted = true;
  }

  addChannel() {
    console.log('Creating channel: ' + JSON.stringify(this.newChannel));
    if ((this.newChannel.name == null) ||(this.newChannel.name.length == 0)) {
      console.log('A channel name is required');
      this.errorMessage = 'A channel name is required';
    } else {
    this.postChannel(this.newChannel).subscribe(
      (channelResult) => {
        this.channelResult = channelResult;
      },
      err => {
        console.log('getChannels - error: ', err);
      },
      () => {
        if (this.channelResult) {
          if (this.channelResult.channel) {
            this.savedChannel = this.channelResult.channel[0];
            console.log("Saved channel: ", this.savedChannel);
          }
        }
        this.newChannel = new Channel('', null);
      }
    );
    }
  }

  postChannel(channel: Channel) : Observable<ChannelResult> {
    return this.channelsService
      .postChannels(this.newChannel);
  }

}
