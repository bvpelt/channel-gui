import { Injectable } from '@angular/core';
import {Channel} from "../domain/channel";

@Injectable({
  providedIn: 'root'
})
export class ChannelchangedService {

  private selectedChannel: Channel = null;

  private static channelService: ChannelchangedService = null;

  private constructor() { }

  public static getChannelService(): ChannelchangedService {
    if (this.channelService == null) {
      this.channelService = new ChannelchangedService();
    }

    return this.channelService;
  }

  public getSelectedChannel(): Channel {
    return this.selectedChannel;
  }

  public setSelectedChannel(selectedChannel: Channel) {
    this.selectedChannel = selectedChannel;
  }
}
