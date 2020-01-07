import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
// tslint:disable-next-line: class-name
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-customer-communication',
  templateUrl: './customer-communication.component.html',
  styleUrls: ['./customer-communication.component.css']
})
export class CustomerCommunicationComponent implements OnInit {
    selecteditem:any;
    dateForm: FormGroup;
    name = '';
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
    productdata: any = [];
    objectKeys = Object.keys;
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
                private sharedService: SharedService ) {

      this.dateForm = fb.group({
        start_Date: new FormControl(new Date()),
        end_Date: new FormControl(new Date()),
      });
    }
    ngOnInit() {
      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        console.log(this.selecteditem);
        if (this.selecteditem) {
          setTimeout(() => {
            this.onChangeCommunication(this.selecteditem);
         }, 0);
       }
      });
      this.CopycommunicationHistoryData = [
        {
          case_number: '68083-19-2',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'OU EUROBIO LAB',
          bu: 'Specialty Fluids.',
          product_name: 'LSR2050A - US Made',
          topic: 'Customer Product Quality Questionnaires',
          email_Content: [
            {
              contact_email: 'dmitri.zagorski@eurobiolab.ee',
              case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
             iupac_name: 'Slica8',
             attached_docs: 'LSR2560 - FDA compliance letter to DARMSTÄDTER GmbH',
             // tslint:disable-next-line: max-line-length
             text_body: 'Dear Sender, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
            },
          {
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
            // tslint:disable-next-line: max-line-length
            text_body: 'Dear Dmitri, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
        },
        {
        contact_email: 'dmitri.zagorski@eurobiolab.ee',
        case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
        attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
       // tslint:disable-next-line: max-line-length
        text_body: 'Momentive routinely screens incoming and outgoing mail messages for viruses, addressees should scan this e-mail and any attachments for viruses themselves.',
         }],
        },
        {
          case_number: '140641',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer LLC Moscow',
          bu: 'Elastomers',
          product_name: 'LSR2003A',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Dear Dmitri, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
          }]
        },
        {
          case_number: '140643',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'ART COSMETICS SRL VIA E.',
          bu: 'Electronic Materials.',
          product_name: 'LSR2003B',
          topic: 'Regulatory Information - Sustainability',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'Silsoft 840 Manufacturing flow diagram',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'This is perfect newtexts. Please fill Vegan declaration that was attached in previous email Lugupidamisega / Best regards / С уважением, Dmitri Zagorski Head of Purchasing Department Tel: +3726120121 Mob:+372 58 181807 Skype ost.eurobiolab',
          }]
        },
        {
          case_number: '140644',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Azelis Australia Pty LTd.',
          bu: 'Basics.',
          product_name: 'LSR2050B - US Made',
          topic: 'Regulatory Information - Sustainability',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'LSR2560 - FDA compliance letter to DARMSTÄDTER GmbH',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'striving to improve service to its customers. In order to do this, we would like to ask you to always contact the Commercial Services Center first in case of a request/inquiry.',
          }]
        },
        {
          case_number: '140645',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'AZELIS CANADA INC.',
          bu: 'Urethane Additives.',
          product_name: 'LSR2060A - US Made',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
           // tslint:disable-next-line: max-line-length
            text_body: 'Momentive routinely screens incoming and outgoing mail messages for viruses, addressees should scan this e-mail and any attachments for viruses themselves.',
          }]
        },
        {
          case_number: '00116026',
          first_level: '	Regulatory Information - Animal Testing',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer PJC.',
          bu: 'Sealants.',
          product_name: 'Silsoft* ETS',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Hi Sunny, Please kindly find the attached documents, Our customer would like to know why the INCI name of Silsoft 860 are different in Composition breakdown and PDS. Also, Polyalkyleneoxide cannot be found on China INCI list (2015 version),.',
            attached_docs: 'TIR Silwet 408 lot 17ESVX180',
          }]
        },
        {
          case_number: '00116027',
          first_level: '	Regulatory Information - Animal Testing',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer PJC.',
          bu: 'Sealants.',
          product_name: 'Silsoft* A-843 conditioning agent',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'TIR Silwet 408 lot 17ESVX180',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Hi Sunny, Please kindly find the attached documents, Our customer would like to know why the INCI name of Silsoft 860 are different in Composition breakdown and PDS. Also, Polyalkyleneoxide cannot be found on China INCI list (2015 version),.',
          }]
        },
      ];
      // communicationPart
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.communicationPart = this.productdata.communicationPart;
        console.log(this.communicationPart);
      }, err => {
        console.error(err);
      });
      // communicationBU
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.communicationBU = this.productdata.communicationBU;
        console.log(this.communicationBU);
      }, err => {
        console.error(err);
      });
      // productCommunication
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.productCommunication = this.productdata.productCommunication;
        console.log(this.productCommunication);
      }, err => {
        console.error(err);
      });
     // topicCommunication
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.topicCommunication = this.productdata.topicCommunication;
        console.log(this.topicCommunication);
      }, err => {
        console.error(err);
      });
     // customerCommunicationChecks
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.customerCommunicationChecks = this.productdata.customerCommunicationChecks;
      console.log(this.customerCommunicationChecks);
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

  // ccHeavyMetals_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.ccHeavyMetals_Data = this.productdata.ccHeavyMetals_Data;
    console.log(this.ccHeavyMetals_Data);
  }, err => {
    console.error(err);
  });
  // CommunicationHistoryHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.CommunicationHistoryHead = this.productdata.CommunicationHistoryHead;
    console.log(this.CommunicationHistoryHead);
  }, err => {
    console.error(err);
  });
  // CommunicationHistoryData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.CommunicationHistoryData = this.productdata.CommunicationHistoryData;
    console.log(this.CommunicationHistoryData);
    this.CommunicationHistoryData.forEach(obj => {
    this.ExcelCommunicationHistoryData.push({
    'Case Number': obj.case_number,
    '1st Level Case Classification': obj.first_level,
    '2nd Level Case Classification': obj.second_level,
    'Contact Email': obj.contact_email,
    'Case Subject': obj.case_subject,
    'Text Body': obj.text_body,
    'Manufacturing Plantr': obj.manufacturing_plant,
    'Material Description': obj.material_description,
    'Material Number': obj.material_number,
    'Tier 2 Owner': obj.tier_owner,
    'Attached Documents': obj.attached_docs,
  });
  });
  }, err => {
    console.error(err);
  });

  // HomeDataDetails
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.HomeDataDetails = this.productdata.HomeDataDetails;
    console.log(this.HomeDataDetails);
  }, err => {
    console.error(err);
  });


}

  selectItem(index, data, radiodata): void {
    this.selectedId = index;
    this.value = data;
    this.radiovalue = radiodata;
    this.productRadioBox(index, this.value, this.radiovalue);
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
   communicationProcess(data) {
      this.commuicationDataCheck = data;
      console.log(this.commuicationDataCheck);
      // tslint:disable-next-line: max-line-length
      this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((communication) => ( communication.customer_name  === this.commuicationDataCheck 
      || communication.product_name === this.commuicationDataCheck
      || communication.bu === this.commuicationDataCheck
      || communication.topic === this.commuicationDataCheck));
      console.log(this.CommunicationHistoryData);
      }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events = event.value;
      console.log(this.events);
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

  customerNameFilter() {
    const CustomerNameData = 'OU EUROBIO LAB';
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData ));
    console.log(this.CommunicationHistoryData);
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


unselect(): void {
  this.selectedBUValue = undefined;
  this.selectedProductValue = undefined;
  this.selectedCustomerValue = undefined;
}

  }