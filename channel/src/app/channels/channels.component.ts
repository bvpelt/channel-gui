import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs/index";

import { Channel } from '../domain/channel';
import { ChannelsService } from '../services/channels.service';
import { ChannelResult } from "../domain/channelResult";
//import {CHANNELRESULT} from "../mock-channels";
import { ChannelchangedService } from "../services/channelchanged.service";
import { GlobalDataService } from "../services/global-data.service";

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  private channelResult: ChannelResult;
  private _channel: Channel[];

  private selectedChannel: Channel;
  private startRemove: boolean = false;
  private globalDataService: GlobalDataService;

  constructor(private channelsService: ChannelsService) {
    this.globalDataService = GlobalDataService.getGlobalDataService();
  }

  @Output('selectedChannelEvent')
  selectedChannelEvent = new EventEmitter<Channel>();

  ngOnInit() {
    this.getChannels().subscribe(
      (channelResult) => {
        this.channelResult = channelResult;
      },
      err => {
        console.log('getChannels - error: ', err);
      },
      () => {
        this._channel = this.channelResult.channel;
      }
    );
  }

  onSelect(channel: Channel) {
    if (this.startRemove == false) {
      this.selectedChannel = channel;
      console.log("CHANNELS: emit event");
      this.selectedChannelEvent.emit(this.selectedChannel);
    }
  }

  public removeChannel(channel: Channel) {
    this.startRemove = true;
    console.log("Remove channel: ", channel.name);
    this.deleteChannels(channel).subscribe(
      (channelResult) => {
        this.channelResult = channelResult;
      },
      err => {
        console.log('getChannels - error: ', err);
      },
      () => {
        this._channel = this.channelResult.channel;
      }
    );
    this.startRemove = false;
  }

  public get channel(): Channel[] {
    return this._channel;
  }

  public set channel(value: Channel[]) {
    this._channel = value;
  }

  public getSelectedChannel(): Channel {
    return this.selectedChannel;
  }

  public setSelectedChannel(value: Channel) {
    this.selectedChannel = value;
  }

  public getChannels(): Observable<ChannelResult> {
    let username: string = this.globalDataService.username;
    let password: string = this.globalDataService.password;
    return this.channelsService
      .getChannels(username, password);
  }

  public deleteChannels(channel: Channel): Observable<ChannelResult> {
    let username: string = this.globalDataService.username;
    let password: string = this.globalDataService.password;
    return this.channelsService
      .removeChannel(channel, username, password);
  }

  logRes(prefix: string, channelResult: ChannelResult) {
    if (channelResult != null) {
      console.log(prefix + 'getchannels from service result: ' + JSON.stringify(channelResult));
    } else {
      console.log(prefix + 'empty result');
    }
  }

}
