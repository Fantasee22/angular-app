export class EmployeeDetail {
  empCode : string;
  empName : string;
  branchCode : string;
  branchName : string;
  positionCode : string;
  positionName : string;
  contractStartDt : string;
  contractEndDt : string;

  constructor() {
    this.empCode = "";
    this.empName = "";
    this.branchCode = "";
    this.branchName = "";
    this.positionCode = "";
    this.positionName = "";
    this.contractStartDt = "";
    this.contractEndDt = "";
  }
}