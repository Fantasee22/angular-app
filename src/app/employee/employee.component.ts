import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../objects/employee';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  items: any = [];
  currentPage = 1;
  pageSize = 10;
  isReady = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    let baseUrl = environment.BeIis;
    this.items = await firstValueFrom( this.http
            .post<any>(
              baseUrl + "/api/Employee/GetAllEmployee", 
              {})
            );
    this.isReady = true;

  }

  pagedItems(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.listEmployee.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.items.listEmployee.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

}
