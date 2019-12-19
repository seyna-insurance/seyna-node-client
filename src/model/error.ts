export class Error {
  status: number;
  type: string;
  msg: string;
  constructor(input: any) {
    this.status = input.status;
    this.type = input.type;
    this.msg = input.msg;
  }
}
