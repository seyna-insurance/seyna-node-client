import fetch from "node-fetch";

import { Contract } from "./model/contract";
import { Error } from "./model/error";
import { Receipt } from "./model/receipt";
import { Claim } from "./model/claim";
import { Settlement } from "./model/settlement";
import { Portfolio } from "./model/portfolio";
import { List } from "./model/list";

export { Claim, Contract, Error, List, Portfolio, Receipt, Settlement };

export default class {
  baseUrl: string = "https://api.seyna.eu/v1";
  apiKey: string;
  apiSecret: string;
  constructor(options: { apiKey: string; apiSecret: string }) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  async sendRequest(method: string, path: string, body?: any) {
    let url = this.baseUrl + path;
    let headers: { [key: string]: string } = {};
    headers["Accept"] = "application/json";
    headers["API-Key"] = this.apiKey + ":" + this.apiSecret;
    if (body) headers["Contet-Type"] = "application/json";
    let response = await fetch(url, { headers });
    let data = await response.json();
    if (response.status > 299) {
      throw new Error(data);
    } else {
      return data;
    }
  }

  async getPortfolio(portfolioId: string): Promise<Portfolio> {
    let body = await this.sendRequest("GET", "/portfolios/" + portfolioId);
    return new Portfolio(body);
  }

  async listPortfolios(from?: string): Promise<List<Portfolio>> {
    let url = "/portfolios/";
    if (from) url += "?from=" + from;
    let data = await this.sendRequest("GET", url);
    return new List<Portfolio>(data);
  }

  async *iterPortfolios(): AsyncGenerator<Portfolio> {
    let from = undefined;
    do {
      let page: List<Portfolio> = await this.listPortfolios(from);
      from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (from);
  }

  async getContract(contractId: string): Promise<Contract> {
    let body = await this.sendRequest("GET", "/contracts/" + contractId);
    return new Contract(body);
  }

  async listContracts(
    portfolioId: string,
    from?: string
  ): Promise<List<Contract>> {
    let url = "/portfolios/" + portfolioId + "/contracts";
    if (from) url += "?from=" + from;
    let data = await this.sendRequest("GET", url);
    return new List<Contract>(data);
  }

  async *iterContracts(portfolioId: string): AsyncGenerator<Contract> {
    let from = undefined;
    do {
      let page: List<Contract> = await this.listContracts(portfolioId, from);
      from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (from);
  }

  async getReceipt(contractId: string): Promise<Receipt> {
    let body = await this.sendRequest("GET", "/receipts/" + contractId);
    return new Receipt(body);
  }

  async listReceipts(
    portfolioId: string,
    from?: string
  ): Promise<List<Receipt>> {
    let url = "/portfolios/" + portfolioId + "/receipts";
    if (from) url += "?from=" + from;
    let data = await this.sendRequest("GET", url);
    return new List<Receipt>(data);
  }

  async *iterReceipts(portfolioId: string): AsyncGenerator<Receipt> {
    let from = undefined;
    do {
      let page: List<Receipt> = await this.listReceipts(portfolioId, from);
      from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (from);
  }

  async getClaim(contractId: string): Promise<Claim> {
    let body = await this.sendRequest("GET", "/claims/" + contractId);
    return new Claim(body);
  }

  async listClaims(portfolioId: string, from?: string): Promise<List<Claim>> {
    let url = "/portfolios/" + portfolioId + "/claims";
    if (from) url += "?from=" + from;
    let data = await this.sendRequest("GET", url);
    return new List<Claim>(data);
  }

  async *iterClaims(portfolioId: string): AsyncGenerator<Claim> {
    let from = undefined;
    do {
      let page: List<Claim> = await this.listClaims(portfolioId, from);
      from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (from);
  }

  async getSettlement(contractId: string): Promise<Settlement> {
    let body = await this.sendRequest("GET", "/settlements/" + contractId);
    return new Settlement(body);
  }

  async listSettlements(
    portfolioId: string,
    from?: string
  ): Promise<List<Settlement>> {
    let url = "/portfolios/" + portfolioId + "/settlements";
    if (from) url += "?from=" + from;
    let data = await this.sendRequest("GET", url);
    return new List<Settlement>(data);
  }

  async *iterSettlements(portfolioId: string): AsyncGenerator<Settlement> {
    let from = undefined;
    do {
      let page: List<Settlement> = await this.listSettlements(
        portfolioId,
        from
      );
      from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (from);
  }
}
