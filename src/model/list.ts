import { Parsable, parse } from "../utils";

export class List<T extends Parsable> {
  next?: string;
  data: T[];
  static fromInput<T extends Parsable>(input: any): List<T> {
    let list = new List<T>();
    list.next = input.next;
    list.data = input.data.map((item: any) => parse(item));
    return list;
  }
}
