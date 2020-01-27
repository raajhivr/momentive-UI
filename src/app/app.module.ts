import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule} from 'primeng/table';
import { NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DropdownModule} from 'primeng/primeng';
import { MultiSelectModule} from 'primeng/primeng';
import {CommonModule} from '@angular/common';
import {EditorModule, SharedModule, ButtonModule} from 'primeng/primeng';
import {InputTextModule, SliderModule} from 'primeng/primeng';
import {HomeService} from './service/home-service.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { MomentiveService} from './service/momentive.service';
import { ViewReportComponent } from './view-report/view-report.component';
import { PageindexComponent } from './pageindex/pageindex.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductComplianceComponent } from './product-compliance/product-compliance.component';
import { CustomerCommunicationComponent } from './customer-communication/customer-communication.component';
import { ToxicologyComponent } from './toxicology/toxicology.component';
import { RestrictedSubstanceComponent } from './restricted-substance/restricted-substance.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { ReportDataComponent } from './report-data/report-data.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ViewReportComponent,
    PageindexComponent,
    ProductAttributesComponent,
    ProductComplianceComponent,
    CustomerCommunicationComponent,
    ToxicologyComponent,
    RestrictedSubstanceComponent,
    SalesVolumeComponent,
    ReportDataComponent,
    SidebarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
    TableModule,
    CommonModule,
    SharedModule,
    Ng2FilterPipeModule,
    ButtonModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    InputTextModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
    ],
  providers: [HomeService, MomentiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
