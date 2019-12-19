import { ContractGuarantees } from "./contract_guarantee";

export class EntityIndividual {
  type: "individual";
  name: string;
  address: string;
  email: string;
  phone: string;
  birthday: string;
  constructor(input: any) {
    this.type = input.type;
    this.name = input.name;
    this.address = input.address;
    this.email = input.email;
    this.phone = input.phone;
    this.birthday = input.birthday;
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
  constructor(input: any) {
    this.type = input.type;
    this.name = input.name;
    this.registration = input.registration;
    this.representative = input.representative;
    this.address = input.address;
    this.email = input.email;
    this.phone = input.phone;
    this.birthday = input.birthday;
  }
}

export type Entity = EntityIndividual | EntityCorporate;

const entityCreate = (input: any) => {
  switch (input.type) {
    case "individual":
      return new EntityIndividual(input);
    case "company":
    case "nonprofit":
      return new EntityCorporate(input);
  }
};

export class Contract {
  portfolioId: string;
  id: string;
  productId: string;

  eventNum: number;
  eventType: string;
  eventDate: string;

  ref: string;
  debug?: string;

  customerId: string;
  creationDate: string;
  lastUpdate: string;
  subscriber: Entity[];
  insured: Entity[];
  beneficiary: Entity[];
  splittingType?: string;
  splittingFee?: number;
  subscriptionDate: string;
  issuanceDate: string;
  startCoverDate: string;
  endCoverDate: string;
  coinsurance?: number;
  extraBrokerFee?: number;
  cancelDate?: string;
  cancelReason?: string;
  guarantees: ContractGuarantees;
  guaranteesDelta: ContractGuarantees;
  productData: any;

  constructor(input: any) {
    this.portfolioId = input.portfolio_id;
    this.id = input.id;
    this.productId = input.product_id;
    this.eventNum = input.event_num;
    this.eventType = input.event_type;
    this.eventDate = input.event_date;
    this.ref = input.ref;
    this.debug = input.debug;
    this.customerId = input.customer_id;
    this.creationDate = input.creation_date;
    this.lastUpdate = input.last_update;
    this.subscriber = input.subscriber.map((item: any) => entityCreate(item));
    this.insured = input.insured.map((item: any) => entityCreate(item));
    this.beneficiary = input.beneficiary.map((item: any) => entityCreate(item));
    this.splittingType = input.splitting_type;
    this.splittingFee = input.splitting_fee;
    this.subscriptionDate = input.subscription_date;
    this.issuanceDate = input.issuance_date;
    this.startCoverDate = input.start_cover_date;
    this.endCoverDate = input.end_cover_date;
    this.coinsurance = input.coinsurance;
    this.extraBrokerFee = input.extra_broker_fee;
    this.cancelDate = input.cancel_date;
    this.cancelReason = input.cancel_reason;
    this.guarantees = ContractGuarantees.fromResponse(input.guarantees);
    this.guaranteesDelta = ContractGuarantees.fromResponse(
      input.guarantees_delta
    );
    this.productData = input.product_data;
  }
}
