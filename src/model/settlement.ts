import { SettlementGuarantees } from "./settlement_guarantee";

export class Settlement {
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
  guaranteesDelta: SettlementGuarantees;
  productData: any;

  constructor(input: any) {
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
    this.guaranteesDelta = new SettlementGuarantees(input.guarantees_delta);
    this.productData = input.product_data;
  }
}
