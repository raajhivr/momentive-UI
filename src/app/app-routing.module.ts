import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ViewReportComponent } from './view-report/view-report.component'


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'app-header', component: HeaderComponent},
  {path: 'app-footer', component: FooterComponent},
  {path: 'app-view-report', component: ViewReportComponent},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
