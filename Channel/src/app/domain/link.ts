export class Link {
  private href: string;

  constructor(ref: string) {
    this.href = ref;
  }


  getHref(): string {
    return this.href;
  }

  setHref(value: string) {
    this.href = value;
  }
}
