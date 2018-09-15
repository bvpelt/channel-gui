import {Channel} from "./channel";
import {SelfLink} from "./selfLink";

export class ChannelResult {
  channel: Channel[];
  _links: SelfLink;

  constructor (o: ChannelResult) {
    this.channel = o.channel;
    this._links = o._links;
  }
}
