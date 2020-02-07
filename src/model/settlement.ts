import { clientSym } from "../utils";
import { Seyna } from "..";

export class Settlement {
  [clientSym]: Seyna;
  portfolioId: string;
  contractId: string;
  claimId: string;
  claimEventNum: number;
  productId: string;
  id: string;
  eventNum: number;
  eventType: "new";
  eventDate: string;
  ref: string;
  debug?: string;
  paymentDate: string;
  creationDate: string;
  lastUpdate: string;
  guarantees: SettlementGuarantees;
  productData: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;
    this.portfolioId = input.portfolio_id;
    this.contractId = input.contract_id;
    this.claimId = input.claim_id;
    this.claimEventNum = input.claim_event_num;
    this.productId = input.product_id;
    this.id = input.id;
    this.eventNum = input.event_num;
    this.eventType = input.event_type;
    this.eventDate = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.paymentDate = input.payment_date;
    this.creationDate = input.creation_date;
    this.lastUpdate = input.last_update;
    this.guarantees = new SettlementGuarantees(input.guarantees);
    this.productData = input.product_data;
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
  managementPaid: number = 0;
  subrogationPaid: number = 0;

  static fromResponse(input: any) {
    let result = new SettlementGuarantee();
    result.paid = input.paid;
    result.managementPaid = input.management_paid;
    result.subrogationPaid = input.subrogation_paid;
    return result;
  }

  plus(value: SettlementGuarantee): SettlementGuarantee {
    let result = new SettlementGuarantee();
    result.paid = this.paid + value.paid;
    result.managementPaid = this.managementPaid + value.managementPaid;
    result.subrogationPaid = this.subrogationPaid + value.subrogationPaid;
    return result;
  }
}
