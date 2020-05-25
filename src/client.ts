import fetch, { Headers } from "node-fetch";
import { stringify } from "querystring";
import { Claim } from "./model/claim";
import { Contract } from "./model/contract";
import { Error } from "./model/error";
import { List } from "./model/list";
import { Portfolio } from "./model/portfolio";
import { Receipt } from "./model/receipt";
import { Settlement } from "./model/settlement";
import { ListOptions, objectIsEmpty } from "./utils";

export class Seyna {
  baseUrl: string = "https://api.seyna.eu/v2";
  apiKey: string;
  apiSecret: string;
  constructor(options: { apiKey: string; apiSecret: string }) {
    this.apiKey = options.apiKey;
    this.apiSecret = options.apiSecret;
  }

  private async sendRequest(method: string, path: string, input?: any) {
    let url = this.baseUrl + path;

    // Set request headers
    let headers: Headers = new Headers();
    headers.set("Accept", "application/json");
    headers.set(
      "Authorization",
      `Basic ${Buffer.from(
        `${this.apiKey}:${this.apiSecret}`,
        "binary"
      ).toString("base64")}`
    );
    if (input) headers.set("Content-Type", "application/json");

    // Set request body
    let body = input ? JSON.stringify(input) : undefined;

    let response = await fetch(url, { headers, body, method });
    let data = await response.json();
    if (response.status > 299) {
      throw Error.fromInput(data);
    } else {
      return data;
    }
  }

  async getPortfolio(portfolio_id: string): Promise<Portfolio> {
    let body = await this.sendRequest("GET", "/portfolios/" + portfolio_id);
    return Portfolio.fromInput(body);
  }

  async listPortfolios(options: ListOptions = {}): Promise<List<Portfolio>> {
    let url = "/portfolios/";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
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

  async getContract(
    portfolio_id: string,
    contract_id: string
  ): Promise<Contract> {
    let body = await this.sendRequest(
      "GET",
      `/portfolios/${portfolio_id}/contracts/${contract_id}`
    );
    return Contract.fromInput(body);
  }

  async putContract(contract: Contract): Promise<Contract> {
    let url = `/portfolios/${contract.portfolio_id}/contracts/${contract.id}`;
    let body = await this.sendRequest("PUT", url, contract);
    return Contract.fromInput(body);
  }

  async listContracts(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Contract>> {
    let url = "/portfolios/" + portfolio_id + "/contracts";
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterContracts(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Contract> {
    do {
      let page: List<Contract> = await this.listContracts(
        portfolio_id,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listContractVersions(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Contract>> {
    let url = `/portfolios/${portfolio_id}/contract-versions`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterContractVersions(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Contract> {
    do {
      let page: List<Contract> = await this.listContractVersions(
        portfolio_id,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getReceipt(
    portfolio_id: string,
    contract_id: string
  ): Promise<Receipt> {
    let body = await this.sendRequest(
      "GET",
      `/portfolios/${portfolio_id}/receipts/${contract_id}`
    );
    return Receipt.fromInput(body);
  }

  async putReceipt(receipt: Receipt): Promise<Receipt> {
    let url = `/portfolios/${receipt.portfolio_id}/receipts/${receipt.id}`;
    let body = await this.sendRequest("PUT", url, receipt);
    return Receipt.fromInput(body);
  }

  async listReceipts(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Receipt>> {
    let url = `/portfolios/${portfolio_id}/receipts`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterReceipts(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Receipt> {
    do {
      let page: List<Receipt> = await this.listReceipts(portfolio_id, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listReceiptVersions(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Receipt>> {
    let url = `/portfolios/${portfolio_id}/receipt-versions`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterReceiptVersions(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Receipt> {
    do {
      let page: List<Receipt> = await this.listReceiptVersions(
        portfolio_id,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getClaim(portfolio_id: string, claim_id: string): Promise<Claim> {
    let body = await this.sendRequest(
      "GET",
      `/portfolios/${portfolio_id}/claims/${claim_id}`
    );
    return Claim.fromInput(body);
  }

  async putClaim(claim: Claim): Promise<Claim> {
    let url = `/portfolios/${claim.portfolio_id}/claims/${claim.id}`;
    let body = await this.sendRequest("PUT", url, claim);
    return Claim.fromInput(body);
  }

  async listClaims(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Claim>> {
    let url = `/portfolios/${portfolio_id}/claims`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterClaims(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Claim> {
    do {
      let page: List<Claim> = await this.listClaims(portfolio_id, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listClaimEvents(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Claim>> {
    let url = `/portfolios/${portfolio_id}/claim-versions`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterClaimEvents(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Claim> {
    do {
      let page: List<Claim> = await this.listClaimEvents(portfolio_id, options);
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async getSettlement(
    portfolio_id: string,
    settlement_id: string
  ): Promise<Settlement> {
    let body = await this.sendRequest(
      "GET",
      `/portfolios/${portfolio_id}/settlements/${settlement_id}`
    );
    return Settlement.fromInput(body);
  }

  async putSettlement(settlement: Settlement): Promise<Settlement> {
    let url = `/portfoliod/${settlement.portfolio_id}/settlements/${settlement.id}`;
    let body = await this.sendRequest("PUT", url, settlement);
    return Settlement.fromInput(body);
  }

  async listSettlements(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Settlement>> {
    let url = `/portfolios/${portfolio_id}/settlements`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterSettlements(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    do {
      let page: List<Settlement> = await this.listSettlements(
        portfolio_id,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }

  async listSettlementEvents(
    portfolio_id: string,
    options: ListOptions = {}
  ): Promise<List<Settlement>> {
    let url = `/portfolios/${portfolio_id}/settlement-events`;
    if (!objectIsEmpty(options)) url += "?" + stringify(options);
    let data = await this.sendRequest("GET", url);
    return List.fromInput(data);
  }

  async *iterSettlementEvents(
    portfolio_id: string,
    options: ListOptions = {}
  ): AsyncGenerator<Settlement> {
    do {
      let page: List<Settlement> = await this.listSettlementEvents(
        portfolio_id,
        options
      );
      options.from = page.next;
      for (let i = 0; i < page.data.length; ++i) {
        yield page.data[i];
      }
    } while (options.from);
  }
}
