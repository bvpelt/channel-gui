import {Channel} from "./channel";
import {ChannelLink} from "./channelLink";

export class ChannelResult {
  channel: Channel[];
  _links: ChannelLink;

  constructor (o: ChannelResult) {
    this.channel = o.channel;
    this._links = o._links;
  }
}
