import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { OfficeBranch } from '../objects/officeBranch';

@Component({
  selector: 'app-office-branch',
  templateUrl: './office-branch.component.html',
  styleUrls: ['./office-branch.component.css']
})
export class OfficeBranchComponent implements OnInit {

  items: any = [];
  currentPage = 1;
  pageSize = 10;
  isReady = false;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    let baseUrl = environment.BeIis;
    this.items = await firstValueFrom( this.http
            .post<any>(
              baseUrl + "/api/Employee/GetAllOfficeBranch", 
              {})
            );
    this.isReady = true;

  }

  pagedItems(): OfficeBranch[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.items.listOfficeBranch.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.items.listOfficeBranch.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

}
