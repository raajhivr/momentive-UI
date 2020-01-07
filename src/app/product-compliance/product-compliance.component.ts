import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedService} from '../service/shared.service';
declare var $: any;


@Component({
  selector: 'app-product-compliance',
  templateUrl: './product-compliance.component.html',
  styleUrls: ['./product-compliance.component.css']
})
export class ProductComplianceComponent implements OnInit {

    selecteditem: any;
    selectednav: 'active';
    placeholder: string;
    keyword: string;
    historyHeading: string ;
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
    dropdownList = [];
    dropdownSettings = {};
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
    objectKeys = Object.keys;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
                private sharedService: SharedService) {
    }

    ngOnInit() {
    // product_type
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.product_type = this.productdata.product_type;
      console.log(this.product_type);
    }, err => {
      console.error(err);
    });

  // regionPart
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.regionPart = this.productdata.regionPart;
    console.log(this.regionPart);
              }, err => {
                console.error(err);
              });

     // ProductComplianceCheck
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.ProductComplianceCheck = this.productdata.ProductComplianceCheck;
      console.log(this.ProductComplianceCheck);
    }, err => {
      console.error(err);
    });
  // cols
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.cols = this.productdata.cols;
    console.log(this.cols);
  }, err => {
    console.error(err);
  });

  // pc_NotificationHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.pc_NotificationHeader = this.productdata.pc_NotificationHeader;
    console.log(this.pc_NotificationHeader);
  }, err => {
    console.error(err);
  });
  // pc_NotificationData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.pc_NotificationData = this.productdata.pc_NotificationData;
    console.log(this.pc_NotificationData);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationEUHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationEUHeader = this.productdata.complianceRegistrationEUHeader;
    console.log(this.complianceRegistrationEUHeader);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationEUData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationEUData = this.productdata.complianceRegistrationEUData;
    console.log(this.complianceRegistrationEUData);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationCanada_Header
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationCanada_Header = this.productdata.complianceRegistrationCanada_Header;
    console.log(this.complianceRegistrationCanada_Header);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationCanada_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationCanada_Data = this.productdata.complianceRegistrationCanada_Data;
    console.log(this.complianceRegistrationCanada_Data);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationLatin_Header
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationLatin_Header = this.productdata.complianceRegistrationLatin_Header;
    console.log(this.complianceRegistrationLatin_Header);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationLatin_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationLatin_Data = this.productdata.complianceRegistrationLatin_Data;
    console.log(this.complianceRegistrationLatin_Data);
  }, err => {
    console.error(err);
  });


  this.momentiveService.notifyObservable$.subscribe(value => {
    this.selecteditem = value;
    console.log(this.selecteditem);
    if (this.selecteditem) {
      setTimeout(() => {
        this.onChangeProductCompliance(this.selecteditem);
     }, 0);
   }
  });
  }

    public selectionItemForFilter(e) {
      const colsTempor = e.value;
      // tslint:disable-next-line: only-arrow-functions
      colsTempor.sort(function (a, b) {
        return a.index - b.index;
      });
      this.cols = [];
      this.cols = colsTempor;
      if (e.value.length > 10) {
        e.value.pop();
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

    /*Product compliance*/
    onChangeProductCompliance(item) {
      this.productComplianceCheck = item;
       // tslint:disable-next-line: align
       if (this.productComplianceCheck === 'Notification Status') {
        this.complianceNotification = true;
        this.complianceRegistration = false;
      } else if (this.productComplianceCheck === 'AG Registration Status') {
        this.complianceNotification = false;
        this.complianceRegistration = true;
      }
    }
    selectRegionProcess(value) {
      this.regionValueCheck = value;
      if ( this.regionValueCheck === 'eu') {
        this.complaint_EU = true;
        this.complaint_canada = false;
        this.complaint_latin = false;
      } else if (this.regionValueCheck === 'us canada') {
        this.complaint_EU = false;
        this.complaint_canada = true;
        this.complaint_latin = false;
      } else if (this.regionValueCheck === 'latin america') {
        this.complaint_EU = false;
        this.complaint_canada = false;
        this.complaint_latin = true;
      }
    }

    setMyStyles() {
      const styles = {
        position: this.product_type.length > 16 ? 'absolute' : 'none',
      };
      return styles;
    }
    chooseDate() {
      this.showDatefield = true;
    }
    createOwner(value) {
  console.log(value);
    }
    onCancel() {
      this.showDatefield = false;
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
