export class CountGuarantees {
  data: { [guarantee: string]: number };
  total: number;
  constructor(input: any) {
    this.data = input.data;
    this.total = input.total;
  }
}
