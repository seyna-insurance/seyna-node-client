export class Receipt {
  portfolio_id: string;
  contract_id: string;
  product_id: string;
  id: string;

  version?: number;
  timestamp: string;

  reference: string;
  issuance_date: string;
  due_date: string;
  payment_date?: string;
  creation_date: string;
  last_update: string;
  start_cover_date: string;
  end_cover_date: string;
  guarantees: ReceiptGuarantees = new ReceiptGuarantees();
  product_data: any = {};

  static fromInput(input: any): Receipt {
    let receipt = new Receipt();

    receipt.portfolio_id = input.portfolio_id;
    receipt.contract_id = input.contract_id;
    receipt.product_id = input.product_id;
    receipt.id = input.id;
    receipt.version = input.version;
    receipt.timestamp = input.timestamp;
    receipt.reference = input.reference;
    receipt.issuance_date = input.issuance_date;
    receipt.due_date = input.due_date;
    receipt.payment_date = input.payment_date;
    receipt.creation_date = input.creation_date;
    receipt.last_update = input.last_update;
    receipt.start_cover_date = input.start_cover_date;
    receipt.end_cover_date = input.end_cover_date;
    receipt.guarantees = ReceiptGuarantees.fromInput(input.guarantees);
    receipt.product_data = input.product_data;

    return receipt;
  }

  addGuarantee(guarantee_name: string, guarantee_data: ReceiptGuarantee) {
    this.guarantees.addGuarantee(guarantee_name, guarantee_data);
  }
}

export class ReceiptGuarantees {
  data: { [guarantee: string]: ReceiptGuarantee } = {};
  static fromInput(input: any): ReceiptGuarantees {
    let guarantees = new ReceiptGuarantees();
    Object.entries(input).forEach(([guarantee_name, guarantee_data]) => {
      guarantees.addGuarantee(
        guarantee_name,
        ReceiptGuarantee.fromInput(guarantee_data)
      );
    });
    return guarantees;
  }
  addGuarantee(guarantee_name: string, guarantee_data: ReceiptGuarantee) {
    this.data[guarantee_name] = guarantee_data;
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
  broker_fee: number = 0;
  cost_acquisition: number = 0;
  static fromInput(input: any): ReceiptGuarantee {
    let result = new ReceiptGuarantee();
    result.premium = input.premium;
    result.tax = input.tax;
    result.discount = input.discount;
    result.broker_fee = input.broker_fee;
    result.cost_acquisition = input.cost_acquisition;
    return result;
  }
  plus(value: ReceiptGuarantee): ReceiptGuarantee {
    let result = new ReceiptGuarantee();
    result.premium = this.premium + value.premium;
    result.tax = this.tax + value.tax;
    result.discount = this.discount + value.discount;
    result.broker_fee = this.broker_fee + value.broker_fee;
    result.cost_acquisition = this.cost_acquisition + value.cost_acquisition;
    return result;
  }
  negate(): ReceiptGuarantee {
    let result = new ReceiptGuarantee();
    result.premium = -this.premium;
    result.tax = -this.tax;
    result.discount = -this.discount;
    result.broker_fee = -this.broker_fee;
    result.cost_acquisition = -this.cost_acquisition;
    return result;
  }
}
