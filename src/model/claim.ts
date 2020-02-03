import { clientSym } from "../utils";
import { Seyna } from "..";

export class Claim {
  [clientSym]: Seyna;

  portfolioId: string;
  contractId: string;
  productId: string;
  id: string;
  eventNum: number;
  eventType: "new" | "revaluation" | "payment" | "closed";
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
        ClaimGuarantee.fromResponse(value)
      ])
    );
  }

  sum(): ClaimGuarantee {
    return Object.entries(this.data)
      .map(([guarantee, value]) => value)
      .reduce(
        (previous, current) => previous.plus(current),
        new ClaimGuarantee()
      );
  }

  toJSON() {
    return this.data;
  }
}

export class ClaimGuarantee {
  fguClaim: number = 0;
  paid: number = 0;
  outstanding: number = 0;
  managementPaid: number = 0;
  managementOutstanding: number = 0;
  subrogationPaid: number = 0;
  subrogationOutstanding: number = 0;
  static fromResponse(input: any): ClaimGuarantee {
    let result = new ClaimGuarantee();
    result.fguClaim = input.fgu_claim;
    result.paid = input.paid;
    result.outstanding = input.outstanding;
    result.managementPaid = input.management_paid;
    result.managementOutstanding = input.management_outstanding;
    result.subrogationPaid = input.subrogation_paid;
    result.subrogationOutstanding = input.subrogation_outstanding;
    return result;
  }
  plus(value: ClaimGuarantee): ClaimGuarantee {
    let result = new ClaimGuarantee();
    result.fguClaim = this.fguClaim + value.fguClaim;
    result.outstanding = this.outstanding + value.outstanding;
    result.paid = this.paid + value.paid;
    result.managementOutstanding =
      this.managementOutstanding + value.managementOutstanding;
    result.managementPaid = this.managementPaid + value.managementPaid;
    result.subrogationOutstanding =
      this.subrogationOutstanding + value.subrogationOutstanding;
    result.subrogationPaid = this.subrogationPaid + value.subrogationPaid;
    return result;
  }
}
