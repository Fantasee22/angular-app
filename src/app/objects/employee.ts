export class Employee {
  id: number;
  name: string;
  code: string;
  isContract: boolean; 
  startDt: string;
  endDt: string;
  address: string;
  phone: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.code = "";
    this.isContract = false;
    this.startDt = "";
    this.endDt = "";
    this.address = "";
    this.phone = "";
  }

}