import { Component, OnInit } from '@angular/core';
import { EmployeeDetail } from '../objects/employeeDetail';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  items: EmployeeDetail[] = [];
  currentPage = 1;
  pageSize = 10;
  isReady = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    let baseUrl = environment.BeIis;
    this.items = await firstValueFrom( this.http
            .post<EmployeeDetail[]>(baseUrl + "/api/Employee/ExecSpGenericFilter", 
              {
                spName: "sp_GetEmployeeDetailWithFilter",
                filter: "WHERE EMPLOYEE.IS_CONTRACT = 1 AND EMPLOYEE.END_DT IS NOT NULL"
              })
            );
    this.isReady = true;

  }

  pagedItems(): EmployeeDetail[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.items.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

}
