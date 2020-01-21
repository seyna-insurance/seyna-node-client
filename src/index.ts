import fetch from "node-fetch";
import { stringify } from "querystring";

import { Contract, ContractGuarantees } from "./model/contract";
import { Error } from "./model/error";
import { Receipt, ReceiptGuarantees } from "./model/receipt";
import { Claim, ClaimGuarantees } from "./model/claim";
import { Settlement, SettlementGuarantees } from "./model/settlement";
import { Portfolio } from "./model/portfolio";
import { List } from "./model/list";
import { objectIsEmpty, ListOptions } from "./utils";

export {
  Claim,
  ClaimGuarantees,
  Contract,
  ContractGuarantees,
  Error,
  List,
  Portfolio,
  Receipt,
  ReceiptGuarantees,
  Settlement,
  SettlementGuarantees
};

export class Seyna {
  baseUrl: string = "https://api.seyna.eu/v1";
  apiKey: string;
  apiSecret: string;
  constructor(options: { apiKey: string; apiSecret: string }) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  private async sendRequest(method: string, path: string, body?: any) {
    let url = this.baseUrl + path;
    let headers: { [key: string]: string } = {};
    headers["Accept"] = "application/json";
    headers["API-Key"] = this.apiKey + ":" + this.apiSecret;
    if (body) headers["Contet-Type"] = "application/json";
    let response = await fetch(url, { headers });
    let data = await response.json();
    if (response.status > 299) {
      throw new Error(data, this);
    } else {
      return data;
    }
  }

  async getPortfolio(portfolioId: string): Promise<Portfolio> {
    let body = await this.sendRequest("GET", "/portfolios/" + portfolioId);
    return new Portfolio(body, this);
  }

  async listPortfolios(options: ListOptions = {}): Promise<List<Portfolio>> {
    let url = "/portfolios/";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Portfolio>(data, this);
  }

  async *iterPortfolios(options: ListOptions = {}): AsyncGenerator<Portfolio> {
    do {
      let page: List<Portfolio> = await this.listPortfolios(options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getContract(contractId: string): Promise<Contract> {
    let body = await this.sendRequest("GET", "/contracts/" + contractId);
    return new Contract(body, this);
  }

  async listContracts(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Contract>> {
    let url = "/portfolios/" + portfolioId + "/contracts";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Contract>(data, this);
  }

  async *iterContracts(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Contract> {
    do {
      let page: List<Contract> = await this.listContracts(portfolioId, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listContractVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Contract>> {
    let url = "/portfolios/" + portfolioId + "/contract-versions";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Contract>(data, this);
  }

  async *iterContractVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Contract> {
    do {
      let page: List<Contract> = await this.listContractVersions(
        portfolioId,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getReceipt(contractId: string): Promise<Receipt> {
    let body = await this.sendRequest("GET", "/receipts/" + contractId);
    return new Receipt(body, this);
  }

  async listReceipts(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Receipt>> {
    let url = "/portfolios/" + portfolioId + "/receipts";
    if (!objectIsEmpty(options)) url += "." + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Receipt>(data, this);
  }

  async *iterReceipts(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Receipt> {
    do {
      let page: List<Receipt> = await this.listReceipts(portfolioId, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listReceiptVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Receipt>> {
    let url = "/portfolios/" + portfolioId + "/receipt-versions";
    if (!objectIsEmpty(options)) url += "." + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Receipt>(data, this);
  }

  async *iterReceiptVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Receipt> {
    do {
      let page: List<Receipt> = await this.listReceiptVersions(
        portfolioId,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getClaim(contractId: string): Promise<Claim> {
    let body = await this.sendRequest("GET", "/claims/" + contractId);
    return new Claim(body, this);
  }

  async listClaims(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Claim>> {
    let url = "/portfolios/" + portfolioId + "/claims";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Claim>(data, this);
  }

  async *iterClaims(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Claim> {
    do {
      let page: List<Claim> = await this.listClaims(portfolioId, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listClaimVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Claim>> {
    let url = "/portfolios/" + portfolioId + "/claim-versions";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Claim>(data, this);
  }

  async *iterClaimVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Claim> {
    do {
      let page: List<Claim> = await this.listClaimVersions(
        portfolioId,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getSettlement(settlementId: string): Promise<Settlement> {
    let body = await this.sendRequest("GET", "/settlements/" + settlementId);
    return new Settlement(body, this);
  }

  async listSettlements(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Settlement>> {
    let url = "/portfolios/" + portfolioId + "/settlements";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Settlement>(data, this);
  }

  async *iterSettlements(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    do {
      let page: List<Settlement> = await this.listSettlements(
        portfolioId,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listSettlementVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): Promise<List<Settlement>> {
    let url = "/portfolios/" + portfolioId + "/settlement-versions";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return new List<Settlement>(data, this);
  }

  async *iterSettlementVersions(
    portfolioId: string,
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    do {
      let page: List<Settlement> = await this.listSettlementVersions(
        portfolioId,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }
}
