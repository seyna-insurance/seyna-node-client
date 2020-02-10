export class Portfolio {
  id: string;
  product_id: string;
  timezone: string;
  name?: string;
  live?: boolean;
  static fromInput(input: any): Portfolio {
    let portfolio = new Portfolio();
    portfolio.id = input.id;
    portfolio.product_id = input.product_id;
    portfolio.timezone = input.timezone;
    portfolio.name = input.name;
    portfolio.live = input.live;
    return portfolio;
  }
}
