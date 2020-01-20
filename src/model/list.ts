import { Seyna } from "..";
import { Parsable, parse } from "../utils";

export class List<T extends Parsable> {
  next?: string;
  data: T[];
  constructor(input: any, client: Seyna) {
    this.next = input.next;
    this.data = input.data.map((item: any) => parse(item, client));
  }
}
