import {SelfLink} from "./selfLink";

export class Channel {
  public name: string;
  public links: SelfLink;

  constructor(name: string, links: SelfLink) {
    this.name = name;
    this.links = links;
  }
}
