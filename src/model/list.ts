import { parse, Parsable } from "../utils/parse";

export class List<T extends Parsable> {
  next?: string;
  data: T[];
  constructor(input: any) {
    this.next = input.next;
    this.data = input.data.map((item: any) => parse(item));
  }
}
