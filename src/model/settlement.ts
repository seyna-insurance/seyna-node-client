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
  eventType: string;
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
        new SettlementGuarantee(value)
      ])
    );
  }
  toJSON() {
    return this.data;
  }
}

export class SettlementGuarantee {
  paid: number;
  managementPaid: number;
  subrogationPaid: number;
  constructor(input: any) {
    this.paid = input.paid;
    this.managementPaid = input.management_paid;
    this.subrogationPaid = input.subrogation_paid;
  }
}
