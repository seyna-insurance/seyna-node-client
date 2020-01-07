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
