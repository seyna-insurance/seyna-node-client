import { Claim } from "../model/claim";
import { Contract } from "../model/contract";
import { Error } from "../model/error";
import { List } from "../model/list";
import { Portfolio } from "../model/portfolio";
import { Receipt } from "../model/receipt";
import { Settlement } from "../model/settlement";

export type ParsableObject =
  | Claim
  | Contract
  | Error
  | Portfolio
  | Receipt
  | Settlement;

export type Parsable = ParsableObject | List<ParsableObject>;

export const parse = (input: any): Parsable => {
  switch (input.object) {
    case "claim":
      return new Claim(input);
    case "contract":
      return new Contract(input);
    case "error":
      return new Error(input);
    case "list":
      return new List(input);
    case "portfolio":
      return new Portfolio(input);
    case "receipt":
      return new Receipt(input);
    case "settlement":
      return new Settlement(input);
    default:
      throw "type not parsable : " + input.object;
  }
};
