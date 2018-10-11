import { Component, OnInit } from '@angular/core';
import {Channel} from "../domain/channel";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {ChannelchangedService} from "../services/channelchanged.service";

@Component({
  selector: 'app-channel-app',
  templateUrl: './channel-app.component.html',
  styleUrls: ['./channel-app.component.css']
})
export class ChannelAppComponent implements OnInit {
  public title = 'Channel';
  private channelChangedService: ChannelchangedService;

  public selectedChannel: Channel = null;

  constructor(private route: ActivatedRoute,
              private location: Location)
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

}
