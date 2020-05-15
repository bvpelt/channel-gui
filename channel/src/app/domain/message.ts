import {SelfLink} from "./selfLink";

export class Message {
  public message: string;
  public dateTime: string;
  public channelid: number;
  public links: SelfLink;


  constructor(message: string, dateTime: string, channelid: number, links: SelfLink) {
    this.message = message;
    this.dateTime = dateTime;
    this.channelid = channelid;
    this.links = links;
  }

}
