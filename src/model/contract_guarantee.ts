export class ContractGuarantees {
  data: { [guarantee: string]: ContractGuarantee } = {};
  static fromResponse(input: any): ContractGuarantees {
    let result = new ContractGuarantees();
    result.data = Object.fromEntries(
      Object.entries(input).map(([guarantee, value]) => [
        guarantee,
        ContractGuarantee.fromResponse(value)
      ])
    );
    return result;
  }
  sum(): ContractGuarantee {
    return Object.entries(this.data)
      .map(([guarantee, value]) => value)
      .reduce(
        (previous, current) => previous.plus(current),
        new ContractGuarantee()
      );
  }
  toJSON() {
    return this.data;
  }
}

export class ContractGuarantee {
  premium: number = 0;
  tax: number = 0;
  discount: number = 0;
  brokerFee: number = 0;
  costAcquisition: number = 0;
  static fromResponse(input: any) {
    let result = new ContractGuarantee();
    result.premium = input.premium;
    result.tax = input.tax;
    result.discount = input.discount;
    result.brokerFee = input.broker_fee;
    result.costAcquisition = input.cost_acquisition;
    return result;
  }
  plus(value: ContractGuarantee): ContractGuarantee {
    let result = new ContractGuarantee();
    result.premium = this.premium + value.premium;
    result.tax = this.tax + value.tax;
    result.discount = this.discount + value.discount;
    result.brokerFee = this.brokerFee + value.brokerFee;
    result.costAcquisition = this.costAcquisition + value.costAcquisition;
    return result;
  }
}
