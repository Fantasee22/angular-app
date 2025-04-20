import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { EmployeePosition } from '../objects/employeePosition';

@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.css']
})
export class EmployeePositionComponent implements OnInit {

  items: any = [];
  currentPage = 1;
  pageSize = 10;
  isReady = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    let baseUrl = environment.BeIis;
    this.items = await firstValueFrom( this.http
            .post<any>(
              baseUrl + "/api/Employee/GetAllEmployeePosition", 
              {})
            );
    this.isReady = true;

  }

  pagedItems(): EmployeePosition[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.listEmployeePosition.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.items.listEmployeePosition.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

}
