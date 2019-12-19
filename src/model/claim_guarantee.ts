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
