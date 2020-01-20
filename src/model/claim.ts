import { clientSym } from "../utils";
import { Seyna } from "..";

export class Claim {
  [clientSym]: Seyna;

  portfolioId: string;
  contractId: string;
  productId: string;
  id: string;
  eventNum: number;
  eventType: string;
  eventDate: string;
  ref: string;
  debug?: string;
  creationDate: string;
  lastUpdate: string;
  occurenceDate: string;
  occurentLocation: string;
  notificationDate: string;
  claimType: string;
  revaluationReason?: string;
  guarantees: ClaimGuarantees;
  productData: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;

    this.portfolioId = input.product_id;
    this.contractId = input.contract_id;
    this.productId = input.product_id;
    this.id = input.id;
    this.eventNum = input.event_num;
    this.eventType = input.event_type;
    this.eventDate = input.event_date;
    this.ref = input.ref;
    this.creationDate = input.creation_date;
    this.lastUpdate = input.last_update;
    this.occurenceDate = input.occurence_date;
    this.occurentLocation = input.occurence_location;
    this.notificationDate = input.notification_date;
    this.claimType = input.claim_type;
    this.revaluationReason = input.revaluation_reason;
    this.guarantees = new ClaimGuarantees(input.guarantees);
    this.productData = input.product_data;
  }
}

export class ClaimGuarantees {
  data: { [guarantee: string]: ClaimGuarantee };
  constructor(input: any) {
    this.data = Object.fromEntries(
      Object.entries(input).map(([guarantee, value]) => [
        guarantee,
        new ClaimGuarantee(value)
      ])
    );
  }

  toJSON() {
    return this.data;
  }
}

export class ClaimGuarantee {
  fguClaim: number;
  paid: number;
  outstanding: number;
  managementPaid: number;
  managementOutstanding: number;
  subrogationPaid: number;
  subrogationOutstanding: number;
  constructor(input: any) {
    this.fguClaim = input.fgu_claim;
    this.paid = input.paid;
    this.outstanding = input.outstanding;
    this.managementPaid = input.management_paid;
    this.managementOutstanding = input.management_outstanding;
    this.subrogationPaid = input.subrogation_paid;
    this.subrogationOutstanding = input.subrogation_outstanding;
  }
}
