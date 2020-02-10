import { clientSym } from "../utils";
import { Seyna } from "..";

export class Receipt {
  [clientSym]: Seyna;
  portfolio_dd: string;
  contract_id: string;
  contract_event_num: number;
  product_id: string;
  id: string;
  event_num: number;
  event_type: string;
  event_date: string;
  ref: string;
  debug?: string;
  issuance_date: string;
  due_date: string;
  payment_date?: string;
  creation_date: string;
  last_update: string;
  start_cover_date: string;
  endcover_date: string;
  guarantees: ReceiptGuarantees;
  product_data: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;

    this.portfolio_dd = input.portfolio_id;
    this.contract_id = input.contract_id;
    this.contract_event_num = input.contract_event_num;
    this.product_id = input.product_id;
    this.id = input.id;
    this.event_num = input.event_num;
    this.event_type = input.event_type;
    this.event_date = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.issuance_date = input.issuance_date;
    this.due_date = input.due_date;
    this.payment_date = input.payment_date;
    this.creation_date = input.creation_date;
    this.last_update = input.last_update;
    this.start_cover_date = input.start_cover_date;
    this.endcover_date = input.end_cover_date;
    this.guarantees = new ReceiptGuarantees(input.guarantees);
    this.product_data = input.product_data;
  }
}

export class ReceiptGuarantees {
  data: { [guarantee: string]: ReceiptGuarantee };
  constructor(input: any) {
    this.data = Object.fromEntries(
      Object.entries(input).map(([guarantee, value]) => [
        guarantee,
        ReceiptGuarantee.fromResponse(value)
      ])
    );
  }
  sum(): ReceiptGuarantee {
    return Object.entries(this.data)
      .map(([guarantee, value]) => value)
      .reduce(
        (previous, current) => previous.plus(current),
        new ReceiptGuarantee()
      );
  }
  toJSON() {
    return this.data;
  }
}

export class ReceiptGuarantee {
  premium: number = 0;
  tax: number = 0;
  discount: number = 0;
  broker_fee: number = 0;
  cost_acquisition: number = 0;
  static fromResponse(input: any) {
    let result = new ReceiptGuarantee();
    result.premium = input.premium;
    result.tax = input.tax;
    result.discount = input.discount;
    result.broker_fee = input.broker_fee;
    result.cost_acquisition = input.cost_acquisition;
    return result;
  }
  plus(value: ReceiptGuarantee): ReceiptGuarantee {
    let result = new ReceiptGuarantee();
    result.premium = this.premium + value.premium;
    result.tax = this.tax + value.tax;
    result.discount = this.discount + value.discount;
    result.broker_fee = this.broker_fee + value.broker_fee;
    result.cost_acquisition = this.cost_acquisition + value.cost_acquisition;
    return result;
  }
}
