import { clientSym } from "../utils";
import { Seyna } from "..";

export class Settlement {
  portfolio_id: string;
  contract_id: string;
  claim_id: string;
  claim_event_num: number;
  product_id: string;
  id: string;

  event_num: number;
  event_type: "new";
  event_date: string;

  ref: string;
  debug?: string;
  payment_date: string;
  creation_date: string;
  last_update: string;
  guarantees: SettlementGuarantees;
  product_data: any;

  static fromInput(input: any): Settlement {
    let settlement = new Settlement();
    settlement.portfolio_id = input.portfolio_id;
    settlement.contract_id = input.contract_id;
    settlement.claim_id = input.claim_id;
    settlement.claim_event_num = input.claim_event_num;
    settlement.product_id = input.product_id;
    settlement.id = input.id;
    settlement.event_num = input.event_num;
    settlement.event_type = input.event_type;
    settlement.event_date = input.event_date;
    settlement.ref = input.ref;
    settlement.debug = input.debug;
    settlement.payment_date = input.payment_date;
    settlement.creation_date = input.creation_date;
    settlement.last_update = input.last_update;
    settlement.guarantees = new SettlementGuarantees(input.guarantees);
    settlement.product_data = input.product_data;
    return settlement;
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
