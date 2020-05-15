import {Link} from "./link";

export class SelfLink {
  private self: Link;

  constructor(link: Link) {
    this.self = link;
  }


  getSelf(): Link {
    return this.self;
  }

  setSelf(value: Link) {
    this.self = value;
  }
}
