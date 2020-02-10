import { clientSym } from "../utils";
import { Seyna } from "..";

export class Claim {
  [clientSym]: Seyna;

  portfolio_id: string;
  contract_id: string;
  product_id: string;
  id: string;
  event_num: number;
  event_type: string;
  event_date: string;
  ref: string;
  debug?: string;
  creation_date: string;
  last_update: string;
  occurence_date: string;
  occurent_location: string;
  notificationDate: string;
  claim_type: string;
  revaluation_reason?: string;
  guarantees: ClaimGuarantees;
  product_data: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;

    this.portfolio_id = input.portfolio_id;
    this.contract_id = input.contract_id;
    this.product_id = input.product_id;
    this.id = input.id;
    this.event_num = input.event_num;
    this.event_type = input.event_type;
    this.event_date = input.event_date;
    this.ref = input.ref;
    this.creation_date = input.creation_date;
    this.last_update = input.last_update;
    this.occurence_date = input.occurence_date;
    this.occurent_location = input.occurence_location;
    this.notificationDate = input.notification_date;
    this.claim_type = input.claim_type;
    this.revaluation_reason = input.revaluation_reason;
    this.guarantees = new ClaimGuarantees(input.guarantees);
    this.product_data = input.product_data;
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
  management_paid: number = 0;
  management_outstanding: number = 0;
  subrogation_paid: number = 0;
  subrogation_outstanding: number = 0;
  static fromResponse(input: any): ClaimGuarantee {
    let result = new ClaimGuarantee();
    result.fguClaim = input.fgu_claim;
    result.paid = input.paid;
    result.outstanding = input.outstanding;
    result.management_paid = input.management_paid;
    result.management_outstanding = input.management_outstanding;
    result.subrogation_paid = input.subrogation_paid;
    result.subrogation_outstanding = input.subrogation_outstanding;
    return result;
  }
  plus(value: ClaimGuarantee): ClaimGuarantee {
    let result = new ClaimGuarantee();
    result.fguClaim = this.fguClaim + value.fguClaim;
    result.outstanding = this.outstanding + value.outstanding;
    result.paid = this.paid + value.paid;
    result.management_outstanding =
      this.management_outstanding + value.management_outstanding;
    result.management_paid = this.management_paid + value.management_paid;
    result.subrogation_outstanding =
      this.subrogation_outstanding + value.subrogation_outstanding;
    result.subrogation_paid = this.subrogation_paid + value.subrogation_paid;
    return result;
  }
}
