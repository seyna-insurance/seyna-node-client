import { clientSym } from "../utils";
import { Seyna } from "..";

export class Receipt {
  [clientSym]: Seyna;
  portfolioId: string;
  contractId: string;
  contractEventNum: number;
  productId: string;
  id: string;
  eventNum: number;
  eventType: "new" | "update" | "paid" | "overdue";
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

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;

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
  brokerFee: number = 0;
  costAcquisition: number = 0;
  static fromResponse(input: any) {
    let result = new ReceiptGuarantee();
    result.premium = input.premium;
    result.tax = input.tax;
    result.discount = input.discount;
    result.brokerFee = input.broker_fee;
    result.costAcquisition = input.cost_acquisition;
    return result;
  }
  plus(value: ReceiptGuarantee): ReceiptGuarantee {
    let result = new ReceiptGuarantee();
    result.premium = this.premium + value.premium;
    result.tax = this.tax + value.tax;
    result.discount = this.discount + value.discount;
    result.brokerFee = this.brokerFee + value.brokerFee;
    result.costAcquisition = this.costAcquisition + value.costAcquisition;
    return result;
  }
}
