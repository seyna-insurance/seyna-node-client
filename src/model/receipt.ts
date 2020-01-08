import { ReceiptGuarantees } from "./receipt_guarantee";

export class Receipt {
  portfolioId: string;
  contractId: string;
  contractEventNum: number;
  productId: string;
  id: string;
  eventNum: number;
  eventType: string;
  eventDate: string;
  ref: string;
  debug?: string;
  issuanceDate: string;
  dueDate: string;
  paymentDate?: string;
  creationDate: string;
  lastUpdate: string;
  startCoverDate: string;
  endCoverDate: string;
  guarantees: ReceiptGuarantees;
  productData: any;

  constructor(input: any) {
    this.portfolioId = input.portfolio_id;
    this.contractId = input.contract_id;
    this.contractEventNum = input.contract_event_num;
    this.productId = input.product_id;
    this.id = input.id;
    this.eventNum = input.event_num;
    this.eventType = input.event_type;
    this.eventDate = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.issuanceDate = input.issuance_date;
    this.dueDate = input.due_date;
    this.paymentDate = input.payment_date;
    this.creationDate = input.creation_date;
    this.lastUpdate = input.last_update;
    this.startCoverDate = input.start_cover_date;
    this.endCoverDate = input.end_cover_date;
    this.guarantees = new ReceiptGuarantees(input.guarantees);
    this.productData = input.product_data;
  }
}
