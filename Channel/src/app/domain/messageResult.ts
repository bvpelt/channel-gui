import {SelfLink} from "./selfLink";
import {Message} from "./message";

export class MessageResult {
  message: Message[];
  _links: SelfLink;

  constructor (o: MessageResult) {
    this.message = o.message;
    this._links = o._links;
  }
}
