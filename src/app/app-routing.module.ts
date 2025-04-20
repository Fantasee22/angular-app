import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeePositionComponent } from './employee-position/employee-position.component';
import { OfficeBranchComponent } from './office-branch/office-branch.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'upload-file', component: UploadFileComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee-position', component: EmployeePositionComponent},
  { path: 'office-branch', component: OfficeBranchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
