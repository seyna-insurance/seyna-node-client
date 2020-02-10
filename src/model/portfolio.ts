import { Seyna } from "..";
import { clientSym, ListOptions } from "../utils";
import { Contract } from "./contract";
import { List } from "./list";
import { Receipt } from "./receipt";
import { Claim } from "./claim";
import { Settlement } from "./settlement";

export class Portfolio {
  [clientSym]: Seyna;
  id: string;
  product_id: string;
  timezone: string;
  name?: string;
  live?: boolean;
  constructor(input: any, client: Seyna) {
    this[clientSym] = client;
    this.id = input.id;
    this.product_id = input.product_id;
    this.timezone = input.timezone;
    this.name = input.name;
    this.live = input.live;
  }

  async listContracts(options: ListOptions = {}): Promise<List<Contract>> {
    return this[clientSym].listContracts(this.id, options);
  }

  async *iterContracts(options: ListOptions = {}): AsyncGenerator<Contract> {
    for await (let contract of this[clientSym].iterContracts(
      this.id,
      options
    )) {
      yield contract;
    }
  }

  async listContractVersions(
    options: ListOptions = {}
  ): Promise<List<Contract>> {
    return this[clientSym].listContractVersions(this.id, options);
  }

  async *iterContractVersions(
    options: ListOptions = {}
  ): AsyncGenerator<Contract> {
    for await (let contract of this[clientSym].iterContractVersions(
      this.id,
      options
    )) {
      yield contract;
    }
  }

  async listReceipts(options: ListOptions = {}): Promise<List<Receipt>> {
    return this[clientSym].listReceipts(this.id, options);
  }

  async *iterReceipts(options: ListOptions = {}): AsyncGenerator<Receipt> {
    for await (let receipt of this[clientSym].iterReceipts(this.id, options)) {
      yield receipt;
    }
  }

  async listReceiptVersions(options: ListOptions = {}): Promise<List<Receipt>> {
    return this[clientSym].listReceiptVersions(this.id, options);
  }

  async *iterReceiptVersions(
    options: ListOptions = {}
  ): AsyncGenerator<Receipt> {
    for await (let receipt of this[clientSym].iterReceiptVersions(
      this.id,
      options
    )) {
      yield receipt;
    }
  }

  async listClaims(options: ListOptions = {}): Promise<List<Claim>> {
    return this[clientSym].listClaims(this.id, options);
  }

  async *iterClaims(options: ListOptions = {}): AsyncGenerator<Claim> {
    for await (let claim of this[clientSym].iterClaims(this.id, options)) {
      yield claim;
    }
  }

  async listClaimVersions(options: ListOptions = {}): Promise<List<Claim>> {
    return this[clientSym].listClaimVersions(this.id, options);
  }

  async *iterClaimVersions(options: ListOptions = {}): AsyncGenerator<Claim> {
    for await (let claim of this[clientSym].iterClaimVersions(
      this.id,
      options
    )) {
      yield claim;
    }
  }

  async listSettlements(options: ListOptions = {}): Promise<List<Settlement>> {
    return this[clientSym].listSettlements(this.id, options);
  }

  async *iterSettlements(
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    for await (let settlement of this[clientSym].iterSettlements(
      this.id,
      options
    )) {
      yield settlement;
    }
  }

  async listSettlementVersions(
    options: ListOptions = {}
  ): Promise<List<Settlement>> {
    return this[clientSym].listSettlements(this.id, options);
  }

  async *iterSettlementVersions(
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    for await (let settlement of this[clientSym].iterSettlementVersions(
      this.id,
      options
    )) {
      yield settlement;
    }
  }
}
