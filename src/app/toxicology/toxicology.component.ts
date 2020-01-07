import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import { TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import {SharedService} from '../service/shared.service';
declare var $: any;

@Component({
  selector: 'app-toxicology',
  templateUrl: './toxicology.component.html',
  styleUrls: ['./toxicology.component.css']
})
export class ToxicologyComponent implements OnInit {

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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
                private sharedService: SharedService) {

    }
    ngOnInit() {

      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        console.log(this.selecteditem);
        if (this.selecteditem) {
          setTimeout(() => {
            this.onChangeToxicology(this.selecteditem);
         }, 0);
       }
      });

      // toxicologyChecks
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.toxicologyChecks = this.productdata.toxicologyChecks;
        console.log(this.toxicologyChecks);
      }, err => {
        console.error(err);
      });
      // toxicologydropData
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.toxicologydropData = this.productdata.toxicologydropData;
        console.log(this.toxicologydropData);
      }, err => {
        console.error(err);
      });
// toxicologyStudyHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyStudyHead = this.productdata.toxicologyStudyHead;
    console.log(this.toxicologyStudyHead);
  }, err => {
    console.error(err);
  });
  // toxicologyStudyData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyStudyData = this.productdata.toxicologyStudyData;
    console.log(this.toxicologyStudyData);
  }, err => {
    console.error(err);
  });
  // toxicologyMonthlyHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyMonthlyHeader = this.productdata.toxicologyMonthlyHeader;
    console.log(this.toxicologyMonthlyHeader);
  }, err => {
    console.error(err);
  });
  // toxicologyMonthlyData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyMonthlyData = this.productdata.toxicologyMonthlyData;
    console.log(this.toxicologyMonthlyData);
  }, err => {
    console.error(err);
  });
  }

  /*Product Attribute*/
  
  onChangeProductAttribute(item) {
      console.log(item);
      this.productAttributesCheck = item;
      if ( this.productAttributesCheck === 'Basic Information') {
        this.primaryInformtionTypes = true;
        this.ghsLabeling = false;
        this.structureAndFormulaTypes = false;
        this.compositionTypes = false;
        this.flowDiagrams = false;
      } else if ( this.productAttributesCheck === 'GHS Labeling') {
        this.primaryInformtionTypes = false;
        this.ghsLabeling = true;
        this.structureAndFormulaTypes = false;
        this.compositionTypes = false;
        this.flowDiagrams = false;
  
      } else if (this.productAttributesCheck === 'Structures and Formulas') {
        this.primaryInformtionTypes = false;
        this.ghsLabeling = false;
        this.structureAndFormulaTypes = true;
        this.compositionTypes = false;
        this.flowDiagrams = false;
      } else if (this.productAttributesCheck === 'Composition') {
        this.primaryInformtionTypes = false;
        this.ghsLabeling = false;
        this.structureAndFormulaTypes = false;
        this.compositionTypes = true;
        this.flowDiagrams = false;
      } else if (this.productAttributesCheck === 'Flow Diagrams') {
        this.primaryInformtionTypes = false;
        this.ghsLabeling = false;
        this.structureAndFormulaTypes = false;
        this.compositionTypes = false;
        this.flowDiagrams = true;
      }
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

    onChangeCommunication(item) {
      this.customerCommunicationTab = item;
      if (this.customerCommunicationTab === 'US FDA Letter') {
        this.usFDA = true;
        this.EuFoodContact = false;
        this.heavyMetals = false;
        this.communicationHistory = false;
      } else if (this.customerCommunicationTab === 'EU Food Contact') {
        this.usFDA = false;
        this.EuFoodContact = true;
        this.heavyMetals = false;
        this.communicationHistory = false;
      } else if ( this.customerCommunicationTab === 'Heavy Metals Composition') {
        this.heavyMetals = true;
        this.communicationHistory = false;
        this.usFDA = false;
        this.EuFoodContact = false;
      } else if (this.customerCommunicationTab === 'Communication History') {
        this.heavyMetals = false;
        this.communicationHistory = true;
        this.usFDA = false;
        this.EuFoodContact = false;
      }
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
    toxicologyProcess(value) {
      this.toxicologyValueCheck = value;
  
      if ( this.toxicologyValueCheck === 'sealant') {
        this.toxicology_sealant = true;
        this.toxicology_silane = false;
  
      }
      if ( this.toxicologyValueCheck === 'silane') {
        this.toxicology_sealant = false;
        this.toxicology_silane = true;
  
      }
    }
    onChangeToxicology(item) {
      this.toxicologyTab = item;
      if ( this.toxicologyTab === 'Study Title and Date') {
        this.studyCheck = true;
        this.monthlyCheck = false;
        this.summaryCheck = false;
        this.dataCheck = false;
  
      // tslint:disable-next-line: align
      }if (this.toxicologyTab === 'Monthly Toxicology Study List') {
        this.studyCheck = false;
        this.monthlyCheck = true;
        this.summaryCheck = false;
        this.dataCheck = false;
      }
      if (this.toxicologyTab === 'Toxicology Summary') {
        this.studyCheck = false;
        this.monthlyCheck = false;
        this.summaryCheck = true;
        this.dataCheck = false;
      }
      if (this.toxicologyTab === 'Toxicology Registration Tracker') {
        this.studyCheck = false;
        this.monthlyCheck = false;
        this.summaryCheck = false;
        this.dataCheck = true;
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
    onChangeSales(item) {
      this.saleTab = item;
      if ( this.saleTab === 'Location Details') {
        this.locationCheck = true;
        this.volumeCheck = false;
      // tslint:disable-next-line: align
      }if (this.saleTab === 'Sales Volume') {
        this.locationCheck = false;
        this.volumeCheck = true;
      }
    }
  
    productBox(index, value) {
      this.selectedboxId = index;
      console.log(this.selectedboxId);
      console.log(value);
      this.selectedId = index;
      this.modalValue = value;
      console.log(this.selectedId);
      console.log(this.modalValue);
      console.log(this.radioItem);
      this.firstModal = false;
      this.secondModal = false;
      this.thirdModal = false;
      this.fourthModal = false;
      this.fifthModal = false;
      this.sixthModal = false;
      this.seventhModal = false;
      this.eightModal = false;
      if ( this.modalValue === 'compositionModal') {
      this.productTitle = 'Product Attributes';
      this.firstModal = true;
      this.onChangeProductAttribute(this.radioItem);
    } else if ( this.modalValue === 'complianceModal') {
      this.productTitle = 'Product Complaince';
      this.secondModal = true;
      this. onChangeProductCompliance(this.radioItem);
    } else if ( this.modalValue === 'communicationModal') {
      this.productTitle = 'Customer Communication';
      this.thirdModal = true;
      this.onChangeCommunication(this.radioItem);
    } else if ( this.modalValue === 'restrictedSubstanceModal') {
      this.productTitle = 'Restricted Substance';
      this.fourthModal = true;
      this.onChangeRestricted(this.radioItem);
    } else if ( this.modalValue === 'toxicologyModal') {
      this.productTitle = 'Toxicology';
      this.fifthModal = true;
      this.onChangeToxicology(this.radioItem);
    } else if ( this.modalValue === 'salesModal') {
      this.productTitle = 'Sales Information';
      this.sixthModal = true;
      this.onChangeSales(this.radioItem);
    }
      if ( this.modalValue === 'reportModal') {
      this.productTitle = 'Report Data';
      this.seventhModal = true;
    }
      if ( this.modalValue === 'serviceReportModal') {
      this.productTitle = 'Self Service Report';
      this.eightModal = true;
    }
    }
    productRadioBox(index, value, Item) {
      this.selectedboxId = index;
      console.log(this.selectedboxId);
      console.log(value);
      console.log(Item);
      this.selectedId = index;
      this.modalValue = value;
      this.radioItem = Item;
      console.log(this.selectedId);
      console.log(this.modalValue);
      console.log(this.radioItem);
      this.firstModal = false;
      this.secondModal = false;
      this.thirdModal = false;
      this.fourthModal = false;
      this.fifthModal = false;
      this.sixthModal = false;
      this.seventhModal = false;
      this.eightModal = false;
      if ( this.modalValue === 'compositionModal') {
      this.productTitle = 'Product Attributes';
      this.firstModal = true;
      this.onChangeProductAttribute(this.radioItem);
    } else if ( this.modalValue === 'complianceModal') {
      this.productTitle = 'Product Complaince';
      this.secondModal = true;
      this. onChangeProductCompliance(this.radioItem);
    } else if ( this.modalValue === 'communicationModal') {
      this.productTitle = 'Customer Communication';
      this.thirdModal = true;
      this.onChangeCommunication(this.radioItem);
    } else if ( this.modalValue === 'restrictedSubstanceModal') {
      this.productTitle = 'Restricted Substance';
      this.fourthModal = true;
      this.onChangeRestricted(this.radioItem);
    } else if ( this.modalValue === 'toxicologyModal') {
      this.productTitle = 'Toxicology';
      this.fifthModal = true;
      this.onChangeToxicology(this.radioItem);
    } else if ( this.modalValue === 'salesModal') {
      this.productTitle = 'Sales Information';
      this.sixthModal = true;
      this.onChangeSales(this.radioItem);
    }
      if ( this.modalValue === 'reportModal') {
      this.productTitle = 'Report Data';
      this.seventhModal = true;
    }
      if ( this.modalValue === 'serviceReportModal') {
      this.productTitle = 'Self Service Report';
      this.eightModal = true;
    }
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
