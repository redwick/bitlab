export class TextLocation {
  public x: number;
  public y: number;
  public text: string;

  constructor(x: number = 0, y: number = 0, text: string = '') {
    this.x = x;
    this.y = y;
    this.text = text;
  }
  set(text: string, x: number = 0, y: number = 0){
    this.text = text;
    this.x = x;
    this.y = y;
  }
}
