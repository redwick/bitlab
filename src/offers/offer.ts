export class Offer {
  public title: string;
  public image: string;
  public descr: string[];
  public examples: string[];

  constructor(title: string, image: string, descr: string[], examples: string[] = []) {
    this.title = title;
    this.image = image;
    this.descr = descr;
    this.examples = examples;
  }
}
