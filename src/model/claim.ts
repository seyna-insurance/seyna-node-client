import { ClaimGuarantees } from "./claim_guarantee";

export class Claim {
  portfolioId: string;
  contractId: string;
  productId: string;
  id: string;
  eventNum: number;
  eventType: string;
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
  guaranteesDelta: ClaimGuarantees;
  productData: any;

  constructor(input: any) {
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
    this.guaranteesDelta = new ClaimGuarantees(input.guarantees_delta);
    this.productData = input.product_data;
  }
}
