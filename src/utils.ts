import { Claim } from "./model/claim";
import { Contract } from "./model/contract";
import { Error } from "./model/error";
import { Portfolio } from "./model/portfolio";
import { Receipt } from "./model/receipt";
import { Settlement } from "./model/settlement";
import { List } from "./model/list";

export type ListOptions = {
  from?: string;
  limit?: number;
  sort?: "asc" | "desc";
};

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
      return Claim.fromInput(input);
    case "contract":
      return Contract.fromInput(input);
    case "error":
      return Error.fromInput(input);
    case "list":
      return List.fromInput(input);
    case "portfolio":
      return Portfolio.fromInput(input);
    case "receipt":
      return Receipt.fromInput(input);
    case "settlement":
      return Settlement.fromInput(input);
    default:
      throw "type not parsable : " + input.object;
  }
};

export const objectIsEmpty = (obj: any): boolean => {
  return Object.entries(obj).length === 0;
};
