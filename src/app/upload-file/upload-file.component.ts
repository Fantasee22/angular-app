import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadFile } from '../objects/uploadFile';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  fileName: string = '';
  base64File: string = '';
  items: any = [];
  currentPage = 1;
  pageSize = 10;
  isReady = false;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    let baseUrl = environment.BeIis;
    this.items = await firstValueFrom( this.http
            .post<UploadFile[]>(baseUrl + "/api/Employee/GetAllUploadFile", 
              {})
            );
    console.log(this.items.listUploadFile);
    this.isReady = true;
  }

  onFileSelected(event: any): void {
    console.log(event);
    const file: File = event.target.files[0];

    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.base64File = result.split(',')[1]; // remove prefix
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
    }
  }

  async onSubmit() {
    if (!this.base64File) {
      alert('No file selected');
      return;
    }

    const payload = {
      fileName: this.fileName,
      base64Data: this.base64File,
    };

    let baseUrl = environment.BeIis;
      this.http.post(
        baseUrl + "/api/Employee/UploadFileExcel", 
        {
          name: this.fileName,
          base64Content: this.base64File
        }).subscribe(
          response =>{
            window.alert("Upload Success!");
            window.location.reload();
          },
          error => {
            window.alert("Upload Failed!");
          }
        );
  }
  
    
  
  pagedItems(): UploadFile[] {
    const start = (this.currentPage - 1) * this.pageSize;
    console.log(this.items.listUploadFile);
    return this.items.listUploadFile.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.items.listUploadFile.length / this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

}
