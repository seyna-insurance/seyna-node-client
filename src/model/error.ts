import { clientSym } from "../utils";
import { Seyna } from "..";

export class Error {
  status: number;
  type: string;
  msg: string;
  static fromInput(input: any): Error {
    let error = new Error();
    error.status = input.status;
    error.type = input.type;
    error.msg = input.msg;
    return error;
  }
}
