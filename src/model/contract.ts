import { clientSym } from "../utils";
import { Seyna } from "..";

export class ContractGuarantees {
  data: { [guarantee: string]: ContractGuarantee } = {};

  static fromResponse(input: any): ContractGuarantees {
    let result = new ContractGuarantees();
    result.data = Object.fromEntries(
      Object.entries(input).map(([guarantee, value]) => [
        guarantee,
        ContractGuarantee.fromInput(value)
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

  toOutput() {
    return Object.fromEntries(
      Object.entries(this.data).map(
        ([key, guarantee]: [string, ContractGuarantee]) => {
          return [key, guarantee.toOutput()];
        }
      )
    );
  }
}

export class ContractGuarantee {
  premium: number = 0;
  tax: number = 0;
  discount: number = 0;
  brokerFee: number = 0;
  costAcquisition: number = 0;

  static fromInput(input: any): ContractGuarantee {
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

  toOutput(): any {
    let output: any = {};

    output.premium = this.premium;
    output.tax = this.tax;
    output.discount = this.discount;
    output.broker_fee = this.brokerFee;
    output.cost_acquisition = this.costAcquisition;

    return output;
  }
}

export interface EntityIndividual {
  type: "individual";
  name: string;
  address: string;
  email: string;
  phone: string;
  birthday: string;
}

export class EntityIndividual {
  static fromInput(input: any): EntityIndividual {
    let entitiy = new EntityIndividual();

    entitiy.type = input.type;
    entitiy.name = input.name;
    entitiy.address = input.address;
    entitiy.email = input.email;
    entitiy.phone = input.phone;
    entitiy.birthday = input.birthday;

    return entitiy;
  }

  toOutput(): any {
    let output: any = {};

    output.type = this.type;
    output.name = this.name;
    output.address = this.address;
    output.email = this.email;
    output.phone = this.phone;
    output.birthday = this.birthday;

    return output;
  }
}

export class EntityCorporate {
  type: "company" | "nonprofit";
  name: string;
  registration: string;
  representative: string;
  address: string;
  email: string;
  phone: string;
  birthday: string;
  static fromInput(input: any): EntityCorporate {
    let entity = new EntityCorporate();
    entity.type = input.type;
    entity.name = input.name;
    entity.registration = input.registration;
    entity.representative = input.representative;
    entity.address = input.address;
    entity.email = input.email;
    entity.phone = input.phone;
    entity.birthday = input.birthday;
    return entity;
  }

  toOutput(): any {
    let output: any = {};

    output.type = this.type;
    output.name = this.name;
    output.registration = this.registration;
    output.representative = this.representative;
    output.address = this.address;
    output.email = this.email;
    output.phone = this.phone;
    output.birthday = this.birthday;

    return output;
  }
}

export type Entity = EntityIndividual | EntityCorporate;

const entityCreate = (input: any) => {
  switch (input.type) {
    case "individual":
      return EntityIndividual.fromInput(input);
    case "company":
    case "nonprofit":
      return EntityCorporate.fromInput(input);
  }
};

export class Contract {
  [clientSym]: Seyna;

  portfolio_id: string;
  id: string;
  product_id: string;

  event_num: number;
  event_type: "new" | "update" | "cancel";
  event_date: string;
  
  ref: string;
  debug?: string;

  customer_id: string;
  creation_date: string;
  last_update: string;
  subscriber: Entity[];
  insured: Entity[];
  beneficiary: Entity[];
  splitting_type?: string;
  splitting_fee?: number;
  subscription_date: string;
  issuance_date: string;
  start_cover_date: string;
  end_cover_date: string;
  coinsurance?: number;
  extra_broker_fee?: number;
  cancel_date?: string;
  cancel_reason?: string;
  guarantees: ContractGuarantees;
  product_data: any;

  constructor(input: any, client: Seyna) {
    this[clientSym] = client;

    this.portfolio_id = input.portfolio_id;
    this.id = input.id;
    this.product_id = input.product_id;
    this.event_num = input.event_num;
    this.event_type = input.event_type;
    this.event_date = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.customer_id = input.customer_id;
    this.creation_date = input.creation_date;
    this.last_update = input.last_update;
    this.subscriber = input.subscriber.map((item: any) => entityCreate(item));
    this.insured = input.insured.map((item: any) => entityCreate(item));
    this.beneficiary = input.beneficiary.map((item: any) => entityCreate(item));
    this.splitting_type = input.splitting_type;
    this.splitting_fee = input.splitting_fee;
    this.subscription_date = input.subscription_date;
    this.issuance_date = input.issuance_date;
    this.start_cover_date = input.start_cover_date;
    this.end_cover_date = input.end_cover_date;
    this.coinsurance = input.coinsurance;
    this.extra_broker_fee = input.extra_broker_fee;
    this.cancel_date = input.cancel_date;
    this.cancel_reason = input.cancel_reason;
    this.guarantees = ContractGuarantees.fromResponse(input.guarantees);
    this.product_data = input.product_data;
  }

  toOutput(): any {
    let output: any = {};

    output.portfolio_id = this.portfolio_id;
    output.id = this.id;
    output.product_id = this.product_id;

    output.event_num = this.event_num;
    output.event_type = this.event_type;
    output.event_date = this.event_date;

    output.ref = this.ref;
    output.debug = this.debug;

    output.customer_id = this.customer_id;

    output.subscriber = this.subscriber.map(subscriber =>
      subscriber.toOutput()
    );
    output.insured = this.insured.map(insured => insured.toOutput());
    output.beneficiary = this.beneficiary.map(beneficiary =>
      beneficiary.toOutput()
    );

    output.splitting_type = this.splitting_type;
    output.splitting_fee = this.splitting_fee;

    output.subscription_date = this.subscription_date;
    output.issuance_date = this.issuance_date;
    output.start_cover_date = this.start_cover_date;
    output.end_cover_date = this.end_cover_date;

    output.coinsurance = this.coinsurance;
    output.extra_broker_fee = this.extra_broker_fee;
    output.cancel_date = this.cancel_date;
    output.cancel_reason = this.cancel_reason;

    output.guarantees = this.guarantees.toOutput();

    output.product_data = this.product_data;

    return output;
  }
}
