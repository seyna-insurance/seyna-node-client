export class Claim {
  portfolio_id: string;
  contract_id: string;
  product_id: string;
  id: string;
  version?: number;
  timestamp: string;
  reference: string;
  status: string;
  creation_date: string;
  last_update: string;
  occurence_date: string;
  occurence_location: string;
  notification_date: string;
  claim_type: string;
  revaluation_reason?: string;
  guarantees: ClaimGuarantees = new ClaimGuarantees();
  product_data: any = {};

  static fromInput(input: any): Claim {
    let claim = new Claim();

    claim.portfolio_id = input.portfolio_id;
    claim.contract_id = input.contract_id;
    claim.product_id = input.product_id;
    claim.id = input.id;
    claim.status = input.status;
    claim.version = input.version;
    claim.timestamp = input.timestamp;
    claim.reference = input.reference;
    claim.creation_date = input.creation_date;
    claim.last_update = input.last_update;
    claim.occurence_date = input.occurence_date;
    claim.occurence_location = input.occurence_location;
    claim.notification_date = input.notification_date;
    claim.claim_type = input.claim_type;
    claim.revaluation_reason = input.revaluation_reason;
    claim.guarantees = ClaimGuarantees.fromInput(input.guarantees);
    claim.product_data = input.product_data;

    return claim;
  }

  addGuarantee(guarantee_name: string, guarantee_data: ClaimGuarantee) {
    this.guarantees.addGuarantee(guarantee_name, guarantee_data);
  }
}

export class ClaimGuarantees {
  data: { [guarantee: string]: ClaimGuarantee } = {};
  static fromInput(input: any): ClaimGuarantees {
    let guarantees = new ClaimGuarantees();
    Object.entries(input).forEach(([guarantee_name, guarantee_data]) =>
      guarantees.addGuarantee(
        guarantee_name,
        ClaimGuarantee.fromInput(guarantee_data)
      )
    );

    return guarantees;
  }

  addGuarantee(guarantee_name: string, guarantee_data: ClaimGuarantee) {
    this.data[guarantee_name] = guarantee_data;
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
  fgu_claim: number = 0;
  paid: number = 0;
  outstanding: number = 0;
  management_paid: number = 0;
  management_outstanding: number = 0;
  subrogation_paid: number = 0;
  subrogation_outstanding: number = 0;
  static fromInput(input: any): ClaimGuarantee {
    let result = new ClaimGuarantee();
    result.fgu_claim = input.fgu_claim;
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
    result.fgu_claim = this.fgu_claim + value.fgu_claim;
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
