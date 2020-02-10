import { clientSym } from "../utils";
import { Seyna } from "..";

export class Settlement {
  [clientSym]: Seyna;
  portfolio_id: string;
  contract_id: string;
  claim_id: string;
  claim_event_num: number;
  product_id: string;
  id: string;
  event_num: number;
  event_type: string;
  event_date: string;
  ref: string;
  debug?: string;
  payment_date: string;
  creation_date: string;
  last_update: string;
  guarantees: SettlementGuarantees;
  product_data: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;
    this.portfolio_id = input.portfolio_id;
    this.contract_id = input.contract_id;
    this.claim_id = input.claim_id;
    this.claim_event_num = input.claim_event_num;
    this.product_id = input.product_id;
    this.id = input.id;
    this.event_num = input.event_num;
    this.event_type = input.event_type;
    this.event_date = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.payment_date = input.payment_date;
    this.creation_date = input.creation_date;
    this.last_update = input.last_update;
    this.guarantees = new SettlementGuarantees(input.guarantees);
    this.product_data = input.product_data;
  }
}

export class SettlementGuarantees {
  data: { [guarantee: string]: SettlementGuarantee };
  constructor(input: any) {
    this.data = Object.fromEntries(
      Object.entries(input).map(([guarantee, value]) => [
        guarantee,
        SettlementGuarantee.fromResponse(value)
      ])
    );
  }
  sum(): SettlementGuarantee {
    return Object.entries(this.data)
      .map(([guarantee, value]) => value)
      .reduce(
        (previous, current) => previous.plus(current),
        new SettlementGuarantee()
      );
  }
  toJSON() {
    return this.data;
  }
}

export class SettlementGuarantee {
  paid: number = 0;
  management_paid: number = 0;
  subrogation_paid: number = 0;

  static fromResponse(input: any) {
    let result = new SettlementGuarantee();
    result.paid = input.paid;
    result.management_paid = input.management_paid;
    result.subrogation_paid = input.subrogation_paid;
    return result;
  }

  plus(value: SettlementGuarantee): SettlementGuarantee {
    let result = new SettlementGuarantee();
    result.paid = this.paid + value.paid;
    result.management_paid = this.management_paid + value.management_paid;
    result.subrogation_paid = this.subrogation_paid + value.subrogation_paid;
    return result;
  }
}
