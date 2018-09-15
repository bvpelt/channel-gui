import {SelfLink} from "./selfLink";

export class Message {
  message: string;
  channelid: number;
  _links: SelfLink;
}
