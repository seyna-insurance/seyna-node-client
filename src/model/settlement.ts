export class Settlement {
  portfolio_id: string;
  claim_id: string;
  product_id: string;
  id: string;

  version?: number;
  timestamp: string;

  reference: string;
  payment_date: string;
  creation_date: string;
  last_update: string;
  guarantees: SettlementGuarantees = new SettlementGuarantees();
  product_data: any = {};

  static fromInput(input: any): Settlement {
    let settlement = new Settlement();
    settlement.portfolio_id = input.portfolio_id;
    settlement.claim_id = input.claim_id;
    settlement.product_id = input.product_id;
    settlement.id = input.id;
    settlement.version = input.version;
    settlement.timestamp = input.timestamp;
    settlement.reference = input.reference;
    settlement.payment_date = input.payment_date;
    settlement.creation_date = input.creation_date;
    settlement.last_update = input.last_update;
    settlement.guarantees = SettlementGuarantees.fromInput(input.guarantees);
    settlement.product_data = input.product_data;
    return settlement;
  }

  addGuarantee(guarantee_name: string, guarantee_data: SettlementGuarantee) {
    this.guarantees.addGuarantee(guarantee_name, guarantee_data);
  }
}

export class SettlementGuarantees {
  data: { [guarantee: string]: SettlementGuarantee } = {};
  static fromInput(input: any): SettlementGuarantees {
    let guarantees = new SettlementGuarantees();
    Object.entries(input).forEach(([guarantee_name, guarantee_data]) =>
      guarantees.addGuarantee(
        guarantee_name,
        SettlementGuarantee.fromInput(guarantee_data)
      )
    );
    return guarantees;
  }

  addGuarantee(guarantee_name: string, guarantee_data: SettlementGuarantee) {
    this.data[guarantee_name] = guarantee_data;
  }

  sum(): SettlementGuarantee {
    return Object.values(this.data)
      .map((value) => value)
      .reduce(
        (previous, current) => previous.plus(current),
        new SettlementGuarantee()
      );
  }
  toJSON() {
    return this.data;
  }
}

export class SettlementGuarantee {
  paid: number = 0;
  management_paid: number = 0;
  subrogation_paid: number = 0;

  static fromInput(input: any) {
    let result = new SettlementGuarantee();
    result.paid = input.paid;
    result.management_paid = input.management_paid;
    result.subrogation_paid = input.subrogation_paid;
    return result;
  }

  plus(value: SettlementGuarantee): SettlementGuarantee {
    let result = new SettlementGuarantee();
    result.paid = this.paid + value.paid;
    result.management_paid = this.management_paid + value.management_paid;
    result.subrogation_paid = this.subrogation_paid + value.subrogation_paid;
    return result;
  }
}
