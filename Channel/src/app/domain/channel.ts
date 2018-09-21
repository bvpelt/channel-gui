import {SelfLink} from "./selfLink";

export class Channel {
  private name: string;
  private links: SelfLink;


  constructor(name: string, links: SelfLink) {
    this.name = name;
    this.links = links;
  }

  getName(): string {
    return this.name;
  }

  setName(value: string) {
    this.name = value;
  }

  getLinks(): SelfLink {
    return this.links;
  }

  setLinks(value: SelfLink) {
    this.links = value;
  }
}
