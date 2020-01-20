import { clientSym } from "../utils";
import { Seyna } from "..";

export class Error {
  [clientSym]: Seyna;
  status: number;
  type: string;
  msg: string;
  constructor(input: any, client: Seyna) {
    this[clientSym] = client;
    this.status = input.status;
    this.type = input.type;
    this.msg = input.msg;
  }
}
