import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedService} from '../service/shared.service';
declare var $: any;

@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.css']
})
export class ReportDataComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    product_Name: any = [];
    // tslint:disable-next-line: variable-name
    product_type: any = [];
    // tslint:disable-next-line: variable-name
    copyproduct_type: any = [];
    compositionPart: any = [];
    emptyProduct: string;
    // tslint:disable-next-line: variable-name
    products_Empty  = false;
    compostionCheck: string;
    compositionLegalTypes = false;
    compositionHunderdTypes = false;
    compositionStandardTypes = true;
    value: string;
    type: string;
    modeselect = 'Legal Composition';
    toxiselected = 'Sealant';
    items: string[];
    selectedIndex: number;
    selectedId: any;
    selectedboxId: any;
  /*Product Attributes */
    productAttributesCheck = 'Basic Information';
    productAttributeCheck: any = [];
    primaryInformtionTypes = true;
    ghsLabeling = false;
    structureAndFormulaTypes = false;
    compositionTypes = false;
    flowDiagrams = false;
    /*Product compliance */
    ProductComplianceCheck: any = [];
    productComplianceCheck = 'Notification Status';
    complianceNotification = true;
    complianceRegistration = false;
     regionParts: any = [];
    regionValueCheck: any;
    // tslint:disable-next-line: variable-name
    complaint_EU = true;
    // tslint:disable-next-line: variable-name
    complaint_us = false;
    // tslint:disable-next-line: variable-name
    complaint_canada = false;
    // tslint:disable-next-line: variable-name
    complaint_latin = false;
    // tslint:disable-next-line: variable-name
    complaint_america = false;
    regionPart: any = [];
    customerCommunicationChecks: any = [];
    customerCommunicationTab = 'US FDA Letter';
    usFDA = true;
    EuFoodContact = false;
    heavyMetals = false;
    communicationHistory = false;
    restrictedSubstanceChecks: any = [];
    restrictedSubstanceTab = 'GADSL';
    gadslCheck = true;
    californiaCheck = false;
    toxicologyChecks: any = [];
    toxicologyTab = 'Study Title and Date';
    studyCheck = true;
    monthlyCheck = false;
    summaryCheck = false;
    dataCheck = false;
    toxicologydropData: any = [];
    toxicologyValueCheck: any;
    // tslint:disable-next-line: variable-name
    toxicology_sealant = true;
    // tslint:disable-next-line: variable-name
    toxicology_silane = false;
    salesCheckData: any = [];
    saleTab = 'Location Details';
    locationCheck = false;
    volumeCheck = true;
    communicationPart: any = [];
    communicationBU: any = [];
    topicCommunication: any = [];
    productCommunication: any = [];
    productTitle: any;
    salesReport: any;
  
    modalValue: string;
    firstModal  = false;
    secondModal = false;
    thirdModal = false;
    fourthModal = false;
    fifthModal = false;
    sixthModal = false;
    seventhModal = false;
    eightModal = false;
    cols: any[];
    legalProducts: any[];
    selectedlegalProducts: any[];
    selectedColumns: any[];
    // GHS Labeling
    ghsLabelingData: any[];
    ghsLabelingHeader: any[];
    selectedLabelingProducts: any[];
    selectedLabelingColumns: any[];
    legalpaginator = false;
    private colsTempor: any[] = [];
    public columnOptions: any[];

  // Report Data
     reportDataproducts: any[];
    reportDataHead: any[];
    selectedReportDataProducts: any[];
    selectedReportDataColumns: any[];
    ReportDatapaginator = false;
    // Sales Volume
    saleDataHead: any[];
    saleDataProducts: any[];
    selectedSalesVolumeDataProducts: any[];
    selectedSalesVolumeDataColumns: any[];
    salesDatapaginator = false;
   // Toxicology Study
    toxicologyStudyData: any[];
    toxicologyStudyHead: any[];
    selectedtoxicologyStudyDataProducts: any[];
    selectedtoxicologyStudyColumns: any[];
    toxicologyStudyDatapaginator = false;
    // Toxicolgy Monthly
    toxicologyMonthlyHeader: any[];
    toxicologyMonthlyData: any[];
    selectedtoxicologyMonthlyProducts: any[];
    selectedtoxicologyMonthlyColumns: any[];
    // Restricted GASDL
    restrictedGASDLHeader: any[];
    restrictedGASDLData: any[];
    selectedrestrictedGASDLProducts: any[];
    selectedrestrictedGASDLColumns: any[];
    restrictedGASDLDatapaginator = false;
    // Restricted Calofornia
    restrictedCaliforniaHeader: any[];
    restrictedCaliforniaData: any[];
    selectedrestrictedCaliforniaProducts: any[];
    selectedrestrictedCaliforniaColumns: any[];
    restrictedCaliforniapaginator = false;
    // Product Compliance Notification
      // tslint:disable-next-line: variable-name
    pc_NotificationData: any[];
        // tslint:disable-next-line: variable-name
    pc_NotificationHeader: any[];
    selectedNotificationProducts: any[];
    selectedNotificationColumns: any[];
    Notificationpaginator = false;
    // Product Compliance RegistrationEU
    // tslint:disable-next-line: variable-name
    complianceRegistrationEUHeader: any[];
    complianceRegistrationEUData: any[];
    selectedcomplianceRegistrationEUProducts: any[];
    selectedcomplianceRegistrationEUColumns: any[];
    complianceRegistrationEUpaginator = false;
    // Product Compliance RegistrationCanada
      // tslint:disable-next-line: variable-name
    complianceRegistrationCanada_Header: any[];
      // tslint:disable-next-line: variable-name
    complianceRegistrationCanada_Data: any[];
      // tslint:disable-next-line: variable-name
    selectedcomplianceRegistrationCanada_Products: any[];
      // tslint:disable-next-line: variable-name
    selectedcomplianceRegistrationCanada_Columns: any[];
      // tslint:disable-next-line: variable-name
    complianceRegistrationCanada_paginator = false;
    // roduct Compliance RegistrationLatin
      // tslint:disable-next-line: variable-name
    complianceRegistrationLatin_Header: any[];
    // tslint:disable-next-line: variable-name
    complianceRegistrationLatin_Data: any[];
      // tslint:disable-next-line: variable-name
    selectedcomplianceRegistrationLatin_Products: any[];
      // tslint:disable-next-line: variable-name
    selectedcomplianceRegistrationLatin_Columns: any[];
      // tslint:disable-next-line: variable-name
    complianceRegistrationLatin_paginator = false;
  // customer Communication Heavy metals
  // tslint:disable-next-line: variable-name
    ccHeavyMetals_Data: any[];
    // tslint:disable-next-line: variable-name
    ccHeavyMetals_Header: any[];
    // Composition Data
    legalCompositionData: any[];
    legalCompositionHead: any[];
    selectedlegalCompositionProducts: any[];
    hunderedCompositionHead: any[];
    hunderedCompositionData: any[];
    copyhunderedCompositionData: any[];
    selectedhunderedCompositionProducts: any[];
    standardCompositionHead: any[];
    standardCompositionData: any[];
    copystandardCompositionData: any[];
    copylegalCompositionData: any[];
    selectedStandardCompositionProducts: any[];
    ExcelStandardData = [];
    ExcelStandardSubData = [];
    newStandardData = [];
  // Communication History
    CommunicationHistoryData: any[];
    CommunicationHistoryHead: any[];
    commuicationDataCheck: any;
    CopycommunicationHistoryData: any[];
    events: any;
    showDatefield = false;
    ExcelCommunicationHistoryData = [];
    // tslint:disable-next-line: variable-name
    product_NameData: any[];
    sidebarData: any;
    copysidebarData: any = [];
    sidebarCategoriesData: any = [];
    basicData = false;
    // tslint:disable-next-line: variable-name
    productLsr_Name: any = [];
    // tslint:disable-next-line: variable-name
    productSilsoft_Name: any = [];
    Searchname: any;
    // tslint:disable-next-line: variable-name
    productCAS_Number: any;
    basicDetails = true;
    submitDetails = false;
    // tslint:disable-next-line: variable-name
    intialData_Details: any = [];
    productLevel: any = [];
    MaterialLevel: any = [];
    componentLevel: any = [];
    LsrproductLevel: any = [];
    LsrMaterialLevel: any = [];
    LsrcomponentLevel: any = [];
    HomeDataDetails: any = [];
    intialDataDetails: any;
    intialDispalyDetails: any = [];
    intialPageDetails: any;
    radioItem: any;
    basicBoxDetails = false;
    basicMouseoverDetails = false;
    otherMouseoverDetails = false;
    radiobuttonchecked = false;
    radiovalue: any;
    selectedBUValue: any;
    selectedProductValue: any;
    selectedCustomerValue: any;
    sidebarTopIcon = false;
    sidebarNav = false;
    openId: any;
    basicBtn = false;
    viewReportPage = false;
    sidenavDetails: any;
    parentObject: any;
    pdfIcon = false;
    searchRelatedMessage = false;
    // New Data;
    productdata: any = [];
    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private momentiveService: MomentiveService,
                 private sharedService: SharedService) {
    }
    ngOnInit() {
  // reportDataHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.reportDataHead = this.productdata.reportDataHead;
    console.log(this.reportDataHead);
  }, err => {
    console.error(err);
  });
  // reportDataProducts
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.reportDataproducts = this.productdata.reportDataproducts;
    console.log(this.reportDataproducts);
  }, err => {
    console.error(err);
  });

  }
    onChangeRestricted(item) {
      this.restrictedSubstanceTab = item;
      if ( this.restrictedSubstanceTab === 'GADSL') {
        this.gadslCheck = true;
        this.californiaCheck = false;
      } else if (this.restrictedSubstanceTab === 'California Prop 65') {
        this.gadslCheck = false;
        this.californiaCheck = true;
      }
    }

    customSort(event) {
      event.data.sort((data1, data2) => {
          const value1 = data1[event.field];
          const value2 = data2[event.field];
          const result = null;
  
          if (value1 == null && value2 != null) {
              const result = -1;
          } else if (value1 != null && value2 == null) {
            const result = 1;
          } else if (value1 == null && value2 == null) {
            const result = 0;
          } else if (typeof value1 === 'string' && typeof value2 === 'string') {
            const  result = value1.localeCompare(value2);
           } else {
            const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
   }
          return (event.order * result);
      });
  }

    setMyStyles() {
      const styles = {
        position: this.product_type.length > 16 ? 'absolute' : 'none',
      };
      return styles;
    }
    onItemSelect(item: any) {
      console.log(item);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
  }
  onSelectAll(items: any) {
      console.log(items);
  }
  onDeSelectAll(items: any) {
      console.log(items);
  }

  }
