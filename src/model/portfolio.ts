export class Portfolio {
  id: string;
  productId: string;
  timezone: string;
  name?: string;
  constructor(input: any) {
    this.id = input.id;
    this.productId = input.product_id;
    this.timezone = input.timezone;
    this.name = input.name;
  }
}
