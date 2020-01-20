import { Claim } from "./model/claim";
import { Contract } from "./model/contract";
import { Error } from "./model/error";
import { Portfolio } from "./model/portfolio";
import { Receipt } from "./model/receipt";
import { Settlement } from "./model/settlement";
import { List } from "./model/list";
import { Seyna } from ".";

export const clientSym = Symbol();

export type ListOptions = {
  from?: string;
  limit?: number;
};

export type ParsableObject =
  | Claim
  | Contract
  | Error
  | Portfolio
  | Receipt
  | Settlement;

export type Parsable = ParsableObject | List<ParsableObject>;

export const parse = (input: any, client: Seyna): Parsable => {
  switch (input.object) {
    case "claim":
      return new Claim(input, client);
    case "contract":
      return new Contract(input, client);
    case "error":
      return new Error(input, client);
    case "list":
      return new List(input, client);
    case "portfolio":
      return new Portfolio(input, client);
    case "receipt":
      return new Receipt(input, client);
    case "settlement":
      return new Settlement(input, client);
    default:
      throw "type not parsable : " + input.object;
  }
};

export const objectIsEmpty = (obj: any): boolean => {
  return Object.entries(obj).length === 0;
};
