import {SelfLink} from "./selfLink";

export class Message {
  message: string;
  dateTime: string;
  channelid: number;
  _links: SelfLink;
}
