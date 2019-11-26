import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import {MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {HomeService} from '../service/home-service.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// tslint:disable-next-line: class-name
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  dateForm: FormGroup;
  name = '';
  selectednav: 'active';
  placeholder: string;
  keyword: string;
  historyHeading: string ;
  // tslint:disable-next-line: variable-name
  product_Name: any = [];
  reactiveForm: FormGroup;
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
  productComplianceCheck = 'US FDA Letter';
  usFDA = true;
  EuFoodContact = false;
  complianceNotification = false;
  complianceRegistration = false;
  notificationStatus = false;
  registrationStatus = false;
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
  customerCommunicationTab = 'Heavy Metals Composition';
  heavyMetals = true;
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
  sidebarCategoriesData:any = [];
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
  product_Data: any = [];

  objectKeys = Object.keys;
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', {static: false}) private codeRef?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeService: HomeService,
              private momentiveService: MomentiveService) {
    this.reactiveForm = fb.group({
      Searchname: ['', Validators.required]
    });
    this.dateForm = fb.group({
      start_Date: new FormControl(new Date()),
      end_Date: new FormControl(new Date()),
    });
    // this.input$.subscribe((newTerm) => {
    //   const logLine = `Typeahead emit: ${newTerm}\n`;
    //   this.codeRef.nativeElement.innerText += logLine;
    // });

    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.product_Name))
    );


  }

  ngOnInit() {
  // Product Name
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.product_Name = this.product_Data.product_Name;
      console.log(this.product_Data);
    }, err => {
      console.error(err);
    });
// LSR 2680FC
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.productLsr_Name = this.product_Data.productLsr_Name;
      console.log(this.product_Data);
    }, err => {
      console.error(err);
    });

// Silsoft
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.productSilsoft_Name = this.product_Data.productSilsoft_Name;
      console.log(this.product_Data);
    }, err => {
      console.error(err);
    });

// CAS NUMBER 556-67-2
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.productCAS_Number = this.product_Data.productCAS_Number;
      console.log(this.product_Data);
    }, err => {
      console.error(err);
    });
  // intialData_Details

    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.intialData_Details = this.product_Data.intialData_Details;
    console.log(this.product_Data);
  }, err => {
    console.error(err);
  });

   // LSR Basic Details

   // Product Level
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.productLevel = this.product_Data.productLevel;
    console.log(this.productLevel);
  }, err => {
    console.error(err);
  });

  // MaterialLevel
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.MaterialLevel = this.product_Data.MaterialLevel;
    console.log(this.MaterialLevel);
  }, err => {
    console.error(err);
  });

  // componentLevel
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.componentLevel = this.product_Data.componentLevel;
    console.log(this.componentLevel);
  }, err => {
    console.error(err);
  });

  // product_type
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.product_type = this.product_Data.product_type;
    console.log(this.product_type);
  }, err => {
    console.error(err);
  });
    // sales_Report
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.salesReport = this.product_Data.salesReport;
      console.log(this.salesReport);
    }, err => {
      console.error(err);
    });
    // sidebarData
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.sidebarData = this.product_Data.sidebarData;
      console.log(this.sidebarData);
      if (this.sidebarData.length > 16){
        this.sidebarTopIcon = true;
      }
    }, err => {
      console.error(err);
    });
    // sidebarCategoriesDat

    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.sidebarCategoriesData = this.product_Data.sidebarCategoriesData;
      console.log(this.sidebarCategoriesData);
    }, err => {
      console.error(err);
    });
    // compositionPart

    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.compositionPart = this.product_Data.compositionPart;
      console.log(this.compositionPart);
    }, err => {
      console.error(err);
    });

    // communicationPart

    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.communicationPart = this.product_Data.communicationPart;
      console.log(this.communicationPart);
    }, err => {
      console.error(err);
    });

    // communicationBU

    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.communicationBU = this.product_Data.communicationBU;
      console.log(this.communicationBU);
    }, err => {
      console.error(err);
    });

    // productCommunication

    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.productCommunication = this.product_Data.productCommunication;
      console.log(this.productCommunication);
    }, err => {
      console.error(err);
    });
// topicCommunication
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.topicCommunication = this.product_Data.topicCommunication;
      console.log(this.topicCommunication);
    }, err => {
      console.error(err);
    });

      // regionPart
    this.momentiveService.getSearchData().subscribe(data => {
        this.product_Data = data;
        this.regionPart = this.product_Data.regionPart;
        console.log(this.regionPart);
      }, err => {
        console.error(err);
      });
    // ProductAttributeCheck
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      console.log(this.product_Data);
      this.productAttributeCheck = this.product_Data.productAttributeCheck;
      console.log(this.productAttributeCheck);
    }, err => {
      console.error(err);
    });
   // ProductComplianceCheck
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.ProductComplianceCheck = this.product_Data.ProductComplianceCheck;
    console.log(this.ProductComplianceCheck);
  }, err => {
    console.error(err);
  });
  // customerCommunicationChecks
    this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.customerCommunicationChecks = this.product_Data.customerCommunicationChecks;
    console.log(this.customerCommunicationChecks);
  }, err => {
    console.error(err);
  });
    // restrictedSubstanceChecks
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.restrictedSubstanceChecks = this.product_Data.restrictedSubstanceChecks;
      console.log(this.restrictedSubstanceChecks);
    }, err => {
      console.error(err);
    });
    // toxicologyChecks
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.toxicologyChecks = this.product_Data.toxicologyChecks;
      console.log(this.toxicologyChecks);
    }, err => {
      console.error(err);
    });
    // toxicologydropData
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.toxicologydropData = this.product_Data.toxicologydropData;
      console.log(this.toxicologydropData);
    }, err => {
      console.error(err);
    });
    // salesCheckData
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Data = data;
      this.salesCheckData = this.product_Data.salesCheckData;
      console.log(this.salesCheckData);
    }, err => {
      console.error(err);
    });

// cols
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.cols = this.product_Data.cols;
  console.log(this.cols);
}, err => {
  console.error(err);
});

// legalProducts
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.legalProducts = this.product_Data.legalProducts;
  console.log(this.legalProducts);
}, err => {
  console.error(err);
});
// ghsLabelingHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.ghsLabelingHeader = this.product_Data.ghsLabelingHeader;
  console.log(this.ghsLabelingHeader);
}, err => {
  console.error(err);
});
//ghsLabelingData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.ghsLabelingData = this.product_Data.ghsLabelingData;
  console.log(this.ghsLabelingData);
}, err => {
  console.error(err);
});
// reportDataHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.reportDataHead = this.product_Data.reportDataHead;
  console.log(this.reportDataHead);
}, err => {
  console.error(err);
});
// reportDataProducts
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.reportDataproducts = this.product_Data.reportDataproducts;
  console.log(this.reportDataproducts);
}, err => {
  console.error(err);
});
// saleDataHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.saleDataHead = this.product_Data.saleDataHead;
  console.log(this.saleDataHead);
}, err => {
  console.error(err);
});
// saleDataProducts
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  console.log(this.product_Data);
  this.saleDataProducts = this.product_Data.saleDataProducts;
  console.log(this.saleDataProducts);
}, err => {
  console.error(err);
});
// toxicologyStudyHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.toxicologyStudyHead = this.product_Data.toxicologyStudyHead;
  console.log(this.toxicologyStudyHead);
}, err => {
  console.error(err);
});
// toxicologyStudyData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.toxicologyStudyData = this.product_Data.toxicologyStudyData;
  console.log(this.toxicologyStudyData);
}, err => {
  console.error(err);
});
// toxicologyMonthlyHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.toxicologyMonthlyHeader = this.product_Data.toxicologyMonthlyHeader;
  console.log(this.toxicologyMonthlyHeader);
}, err => {
  console.error(err);
});
// toxicologyMonthlyData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.toxicologyMonthlyData = this.product_Data.toxicologyMonthlyData;
  console.log(this.toxicologyMonthlyData);
}, err => {
  console.error(err);
});

// restrictedGASDLHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.restrictedGASDLHeader = this.product_Data.restrictedGASDLHeader;
  console.log(this.restrictedGASDLHeader);
}, err => {
  console.error(err);
});
// restrictedGASDLData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.restrictedGASDLData = this.product_Data.restrictedGASDLData;
  console.log(this.restrictedGASDLData);
}, err => {
  console.error(err);
});
// restrictedCaliforniaHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.restrictedCaliforniaHeader = this.product_Data.restrictedCaliforniaHeader;
  console.log(this.restrictedCaliforniaHeader);
}, err => {
  console.error(err);
});
// restrictedCaliforniaData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.restrictedCaliforniaData = this.product_Data.restrictedCaliforniaData;
  console.log(this.restrictedCaliforniaData);
}, err => {
  console.error(err);
});
// pc_NotificationHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.pc_NotificationHeader = this.product_Data.pc_NotificationHeader;
  console.log(this.pc_NotificationHeader);
}, err => {
  console.error(err);
});

// pc_NotificationData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.pc_NotificationData = this.product_Data.pc_NotificationData;
  console.log(this.pc_NotificationData);
}, err => {
  console.error(err);
});

// complianceRegistrationEUHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationEUHeader = this.product_Data.complianceRegistrationEUHeader;
  console.log(this.complianceRegistrationEUHeader);
}, err => {
  console.error(err);
});
//complianceRegistrationEUData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationEUData = this.product_Data.complianceRegistrationEUData;
  console.log(this.complianceRegistrationEUData);
}, err => {
  console.error(err);
});
// complianceRegistrationCanada_Header
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationCanada_Header = this.product_Data.complianceRegistrationCanada_Header;
  console.log(this.complianceRegistrationCanada_Header);
}, err => {
  console.error(err);
});
// complianceRegistrationCanada_Data
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationCanada_Data = this.product_Data.complianceRegistrationCanada_Data;
  console.log(this.complianceRegistrationCanada_Data);
}, err => {
  console.error(err);
});
// complianceRegistrationLatin_Header
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationLatin_Header = this.product_Data.complianceRegistrationLatin_Header;
  console.log(this.complianceRegistrationLatin_Header);
}, err => {
  console.error(err);
});

// complianceRegistrationLatin_Data
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.complianceRegistrationLatin_Data = this.product_Data.complianceRegistrationLatin_Data;
  console.log(this.complianceRegistrationLatin_Data);
}, err => {
  console.error(err);
});
// ccHeavyMetals_Data
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.ccHeavyMetals_Data = this.product_Data.ccHeavyMetals_Data;
  console.log(this.ccHeavyMetals_Data);
}, err => {
  console.error(err);
});

// legalCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.legalCompositionHead = this.product_Data.legalCompositionHead;
  console.log(this.legalCompositionHead);
}, err => {
  console.error(err);
});

// legalCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.legalCompositionData = this.product_Data.legalCompositionData;
  console.log(this.legalCompositionData);
}, err => {
  console.error(err);
});


// hunderedCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.hunderedCompositionHead = this.product_Data.hunderedCompositionHead;
  console.log(this.hunderedCompositionHead);
}, err => {
  console.error(err);
});

// hunderedCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.hunderedCompositionData = this.product_Data.hunderedCompositionData;
  console.log(this.hunderedCompositionData);
}, err => {
  console.error(err);
});


// standardCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.standardCompositionHead = this.product_Data.standardCompositionHead;
  console.log(this.standardCompositionHead);
}, err => {
  console.error(err);
});

// standardCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.standardCompositionData = this.product_Data.standardCompositionData;
  console.log(this.standardCompositionData);

     /* Excel Report for Standard Composition */
  let tempExcelStandardSubData = '';
  console.log(this.standardCompositionData);
  this.standardCompositionData.forEach(obj => {
      tempExcelStandardSubData = '';
      obj.Component_Name.forEach(Component_New => {
            // tslint:disable-next-line: max-line-length
            tempExcelStandardSubData += ' CAS Name:' + Component_New.cas_name + ' IUPAC Name:' + Component_New.iupac_name + ' INCI Name:' + Component_New.INCI_Name;
          });
      this.ExcelStandardData.push({
        'Component Type': obj.ComponentType,
        'Component Id': obj.Component_Id,
        'Case Number': obj.CAS_Number,
        'Value in %': obj.Value,
        'Component Name': tempExcelStandardSubData
    });
    });
}, err => {
  console.error(err);
});
// CommunicationHistoryHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.CommunicationHistoryHead = this.product_Data.CommunicationHistoryHead;
  console.log(this.CommunicationHistoryHead);
}, err => {
  console.error(err);
});
// CommunicationHistoryData
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.CommunicationHistoryData = this.product_Data.CommunicationHistoryData;
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
// intialDataDetails
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.intialDataDetails = this.product_Data.intialDataDetails;
  console.log(this.intialDataDetails);
}, err => {
  console.error(err);
});
// HomeDataDetails
    this.momentiveService.getSearchData().subscribe(data => {
  this.product_Data = data;
  this.HomeDataDetails = this.product_Data.HomeDataDetails;
  console.log(this.HomeDataDetails);
}, err => {
  console.error(err);
});

    this.dropdownList = [
      { item_id: 1, item_text: 'CAS Number' },
      { item_id: 2, item_text: 'YES Number' },
      { item_id: 3, item_text: 'Material Name' },
      { item_id: 4, item_text: 'Material Number' },
      { item_id: 5, item_text: 'Product Name' },
      { item_id: 6, item_text: 'Product Id' },
      { item_id: 7, item_text: 'Categories' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';

    this.copyproduct_type = [
          {
            product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name : 'Product Attributes',
             image : 'https://5.imimg.com/data5/CS/BR/MY-3222221/pharmaceuticals-chemicals-500x500.jpg',
             modal_id: 'composition',
             tab_modal: 'compositionModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name: 'Product Complaince',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WDKemmPJYhXsoGknA6nJwlRZTQzuYBY4xmpWAbInraPIJfAT',
             modal_id: 'product_Compliance',
             tab_modal: 'complianceModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name : 'Customer Communication',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzuuf2CXVDH2fVLuKJRbIqd14LsQSAGaKb7_hgs9HAOtSsQsCL',
             modal_id: 'customerCommunication',
             tab_modal: 'communicationModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3 Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name : 'Restricted Substance',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJXf4wky23vgRlLzdkExEFrkakubrov2OWcG9DTmDA1zA2-U-',
             modal_id: 'restrictedSubstance',
             tab_modal: 'restrictedSubstanceModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3 Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name : 'Toxicology',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnge4Y9lv59WO3hYGJRSerUUSTG1FUWE4MNlFPaLu2CFOc0rsR',
             modal_id: 'toxicology',
             tab_modal: 'toxicologyModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name : 'Sales Information',
             image : 'https://flaptics.io/images/yu.png',
             modal_id: 'sales_Information',
             tab_modal: 'salesModal'
           },
          {
             product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
             id: 'LSR 2680FC A',
             Name: 'Report Data',
             image: 'https://medschool.duke.edu/sites/medschool.duke.edu/files/styles/interior_image/public/field/image/reports.jpg?itok=F7UK-zyt',
             modal_id: 'report_Data',
             tab_modal: 'reportModal'
          },
          {
            product_name: '000000069023 LSR 2680FC B-C3',
             id: 'LSR 2680FC A',
             Name : 'Self Service Report',
             image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSReXGibHOlD7Z5nNqD4d4V52CVMmi-fGUEKMH2HE7srV_SzNn_g',
             modal_id: 'serviceReport',
             tab_modal: 'serviceReportModal'
          }];

    this.copysidebarData = [
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Product Attributes',
                 image : 'https://5.imimg.com/data5/CS/BR/MY-3222221/pharmaceuticals-chemicals-500x500.jpg',
                 sales_tab: 'product_attribute',
                 modal_id: 'composition',
                 tab_modal: 'compositionModal',
                 tab_content: [
                  {
                    name: 'Basic Information', id: 1,
                  },
                    {
                      name: 'GHS Labeling', id: 2,
                    },
                    {
                      name: 'Structures and Formulas', id: 3,
                    },
                    {
                      name: 'Composition', id: 4,
                    },
                    {
                    name: 'Flow Diagrams', id: 5,
                    }],
              },
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Product Complaince',
                 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WDKemmPJYhXsoGknA6nJwlRZTQzuYBY4xmpWAbInraPIJfAT',
                 sales_tab: 'product_Compliance',
                 modal_id: 'product_Compliance',
                 tab_modal: 'complianceModal',
                 tab_content: [
                  {
                    name: 'US FDA Letter', id: 1,
                  },
                  {
                    name: 'EU Food Contact', id: 2,
                  },
                  {
                    name: 'Notification Status', id: 3,
                  }, 
                  {
                    name: 'AG Registration Status', id: 4,
                  }],
              },
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Customer Communication',
                 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzuuf2CXVDH2fVLuKJRbIqd14LsQSAGaKb7_hgs9HAOtSsQsCL',
                sales_tab: 'customerCommunication',
                 modal_id: 'customerCommunication',
                 tab_modal: 'communicationModal',
                 customer_name: 'OU EUROBIO LAB',
                 tab_content: [
                  {
                    name: 'Heavy Metals Composition', id: 1,
                  },
                  {
                    name: 'Communication History', id: 2,
                  }],
              },
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Toxicology',
                 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnge4Y9lv59WO3hYGJRSerUUSTG1FUWE4MNlFPaLu2CFOc0rsR',
                 sales_tab : 'toxicology',
                 modal_id: 'toxicology',
                 tab_modal: 'toxicologyModal' ,
                 tab_content: [
                  {
                    name: 'Study Title and Date', id: 1,
                  },
                  {
                    name: 'Monthly Toxicology Study List', id: 2,
                  },
                  {
                    name: 'Toxicology Summary', id: 2,
                  },
                  {
                    name: 'Toxicology Registration Tracker', id: 2,
                  }],
              },
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Restricted Substance',
                 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJXf4wky23vgRlLzdkExEFrkakubrov2OWcG9DTmDA1zA2-U-',
                 sales_tab: 'restrictedSubstance',
                 modal_id: 'restrictedSubstance',
                 tab_modal: 'restrictedSubstanceModal' ,
                 tab_content: [
                  {
                    name: 'GADSL', id: 1,
                  },
                  {
                    name: 'California Pro 65', id: 2,
                  }],
              },
              {
                product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name : 'Sales Information',
                 image : 'https://flaptics.io/images/yu.png',
                 sales_tab: 'sales_Information',
                 modal_id: 'sales_Information',
                 tab_modal: 'salesModal',
                 tab_content: [
                  {
                    name: 'Sales Volume', id: 1,
                  },
                  {
                    name: 'Location Details', id: 2,
                  }],
              },
              {
                 product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
                 id: 'LSR 2680FC A',
                 Name: 'Report Data',
                 image: 'https://medschool.duke.edu/sites/medschool.duke.edu/files/styles/interior_image/public/field/image/reports.jpg?itok=F7UK-zyt',
                 sales_tab: 'report_Data',
                 modal_id: 'report_Data',
                 tab_modal: 'reportModal',
                 tab_content: [
                  {
                    name: 'Relesed Documents', id: 1,
                  }],
              }
             ];

    this.copylegalCompositionData = [
    {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002925',
      CAS_Number: '68083-19-2',
      Component_Name: [
        {cas_name: 'Decamethylcyclopentasiloxane',
        iupac_name: 'Cyclopentasiloxane, decamethyl-',
        INCI_Name: ['CYCLOPENTASILOXANE'],
      }],
        Value: '86%'
    },
    {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002670',
      CAS_Number: '556-67-2',
      Component_Name: [
        {cas_name: 'Octamethylcyclotetrasiloxane',
         iupac_name: 'Cyclotetrasiloxane, octamethyl-',
        INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
      }],
        Value: '14%'
    }
 ];
    this.copyhunderedCompositionData = [
    {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002766',
      CAS_Number: '68083-19-2',
      Component_Name: [
        {cas_name: 'Slica',
        iupac_name: 'Slica',
        INCI_Name: ['slica', 'SOLUM DIATOMEAE'],
      }],
        Value: '29.85%'
    },
    {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002652',
      CAS_Number: '999-97-3',
      Component_Name: [
        {cas_name: 'Hexamethyldisilazane',
         iupac_name: 'Silanamine 1,1,1-trimethyl-N-(trimethylsilyl)-',
      }],
        Value: '6.62%'
    }, {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002932',
      CAS_Number: '7691-02-3',
      Component_Name: [
        {cas_name: 'Divinyltetramethyldisilazane',
        iupac_name: '1,3-Divinyltetramethyldisilazane',
      }],
      Value: '1.24%'
    }, {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002670',
      CAS_Number: '556-67-2',
      Component_Name: [
        {cas_name: 'Octamethylcyclotetrasiloxane',
        iupac_name: 'Cyclotetrasiloxane, octamethyl-',
        INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
      }],
      Value: '0.12%'
    }, {
      ComponentType: 'Active ingredient',
      Component_Id: '000000003091',
      CAS_Number: '2627-95-4',
      Component_Name: [
        {cas_name: 'Divinyltetramethyldisiloxane',
         iupac_name: 'DISILOXANE, 1,3-DIETHINYL-1,1,3,3-TETRAMETHYL-',
      }],
      Value: '0.12%'
    }, {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002678',
      CAS_Number: '2554-06-5',
      Component_Name: [
        {cas_name: 'Cyclotetrasiloxane, 2,4,6,8-tetraethenyl-2,4,6,8-tetramethyl-',
         iupac_name: 'CYCLOTETRASILOXANE, 2,4,6,8-TETRAETHYLENE-2,4,6,8-TETRAMETHYL-',
      }],
      Value: '0.53%'
    }
 ];

    this.copystandardCompositionData = [
    {
      ComponentType: 'Active ingredient',
      Component_Id: '000000002925',
      CAS_Number: '68083-19-2',
      Component_Name: [
        { cas_name: 'Decamethylcyclopentasiloxane',
         iupac_name: 'Cyclopentasiloxane decamethyl-',
        INCI_Name: ['CYCLOPENTASILOXANE'],
      }],
        Value: '84.06%'
    },
    {
      ComponentType: 'Impurity',
      Component_Id: '000000002681',
      CAS_Number: '70131-67-8',
      Component_Name: [
        { cas_name: 'Siloxanes and Silicones, di-Me hydroxy terminated',
         iupac_name: 'Dimethylpolysiloxane',
      }],
        Value: '15%'
    }, {
      ComponentType: 'Impurity',
      Component_Id: '000000003060',
      CAS_Number: '540-97-6',
      Component_Name: [
        {cas_name: 'Dodecamethylcyclohexasiloxane',
        iupac_name: 'Cyclohexasiloxane Dodecamethyl-',
        INCI_Name: ['CYCLOHEXASILOXANE'],
      }],
      Value: '2.1%'
    }, {
      ComponentType: 'Impurity',
      Component_Id: '000000002932',
      CAS_Number: '556-67-2',
      Component_Name: [
        {cas_name: 'Octamethylcyclotetrasiloxane',
        iupac_name: 'Cyclotetrasiloxane, octamethyl-',
        INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
      }],
      Value: '0.704 %'
    }
   ];



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


}


groupByFn = (item) => item.product;




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
  /**
   * Search productform
   */
  submitProduct(data) {
    if (this.reactiveForm.valid) {
    console.log(data[1]);
    const customerName = data[1];
    if (data[0] === 'LSR 2680FC A' &&  customerName === 'OU EUROBIO LAB') {

      this.basicDetails = false;
      this.submitDetails = true;
      this.sidebarData = this.copysidebarData.filter((element) => (element.customer_name == customerName)); 
    } else {
      this.basicDetails = false;
      this.submitDetails = true;
      console.log(this.reactiveForm.value);
      const products = this.reactiveForm.value;
      console.log(products);
    }
  }
  }

  selectEvent(item) {
    // do something with selected item
    console.log(item);
  }
  onChangeSearch(data) {
    if (data.length > 2) {
      console.log(data);
      this.product_NameData = this.product_Name.filter((ProductName) => (ProductName.includes(data)));
      console.log(this.product_NameData);
    }

    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

  }
  onFocused(data) {
  this.onChangeSearch(data);
  }


CompositionTypes(value) {
    this.compostionCheck = value;
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


  compositionProcess(value) {
     this.compostionCheck = value;
     if (this.compostionCheck === 'legal') {
      this.compositionLegalTypes = true;
      this.compositionHunderdTypes = false;
      this.compositionStandardTypes = false;
    } else if (this.compostionCheck === 'hundered') {
      this.compositionLegalTypes = false;
      this.compositionHunderdTypes = true;
      this.compositionStandardTypes = false;
    } else if (this.compostionCheck === 'standard') {
      this.compositionLegalTypes = false;
      this.compositionHunderdTypes = false;
      this.compositionStandardTypes = true;
    }
  }

  /*Product compliance*/
  onChangeProductCompliance(item) {
    this.productComplianceCheck = item;
    if (this.productComplianceCheck === 'US FDA Letter') {
      this.usFDA = true;
      this.EuFoodContact = false;
      this.notificationStatus = false;
      this.registrationStatus = false;
    } else if (this.productComplianceCheck === 'EU Food Contact') {
      this.usFDA = false;
      this.EuFoodContact = true;
      this.notificationStatus = false;
      this.registrationStatus = false;
    } else if (this.productComplianceCheck === 'Notification Status') {
      this.usFDA = false;
      this.EuFoodContact = false;
      this.complianceNotification = true;
      this.complianceRegistration = false;
    } else if (this.productComplianceCheck === 'AG Registration Status') {
      this.usFDA = false;
      this.EuFoodContact = false;
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
  onChangeCommunication(item) {
    this.customerCommunicationTab = item;
    if ( this.customerCommunicationTab === 'Heavy Metals Composition') {
      this.heavyMetals = true;
      this.communicationHistory = false;
    }
    if (this.customerCommunicationTab === 'Communication History') {
      this.heavyMetals = false;
      this.communicationHistory = true;
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

  /* Excel Report for click Functionality*/
  // exportAsXLSX(data): void {
  //   this.homeService.exportAsExcelFile(this.ExcelCommunicationHistoryData, 'communication_History');
  // }
  // exportStandardXLSX(data): void {
  //   this.homeService.exportAsExcelFile(this.ExcelStandardData, 'standard_composition');
  // }
  // exportLegalXLSX(data): void {
  //   this.homeService.exportAsExcelFile(this.legalCompositionData, 'legal_Composition');
  // }
  // exportHunderedXLSX(data): void {
  //   this.homeService.exportAsExcelFile(this.hunderedCompositionData, 'hundered_Composition');
  // }

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
private searchProduct(term: string | null, arr): product_Name[] {
  const searchTerm = term ? term : '';
  if (searchTerm.length > 0) {
  if (searchTerm === 'CUST' || searchTerm === 'MAT' || searchTerm === 'SPEC' || searchTerm === 'CAS') {
  console.log(searchTerm);
  return arr.filter((product_Name) => {
    return product_Name.product.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
  } else {
  console.log(searchTerm);
  return arr.filter((product_Name) => {
    return product_Name.name.toLowerCase().startsWith(searchTerm.toLowerCase());
  });
}
}
}

onChangeData(data) {
  console.log(data);
  this.submitDetails = true;
  this.viewReportPage = false;
  this.basicBtn = true;
  console.log(data.length);
  if (data.length === 0) {
    this.basicDetails = true;
  }
  if (data.length === 1) {
  const selctedSearchDataProduct = data[0].name;
  console.log(selctedSearchDataProduct);
  if (selctedSearchDataProduct === 'LSR 2680FC A') {
  this.basicDetails = false;
  this.submitDetails = true;
  this.viewReportPage = false;
  this.basicBoxDetails = true;
  this.items$ = this.input$.pipe(
    map((term) => this.searchProduct(term, this.productLsr_Name))
  );
  this.LsrcomponentLevel = [];
  this.LsrMaterialLevel = [];
  this.LsrproductLevel = this.productLevel;

 } else if (selctedSearchDataProduct === '68083-19-2') {
  this.items$ = this.input$.pipe(
    map((term) => this.searchProduct(term, this.productLsr_Name))
  );
  this.LsrproductLevel = [];
  this.LsrMaterialLevel = [];
  this.LsrcomponentLevel = this.componentLevel;
  this.basicDetails = false;
  this.submitDetails = true;
  this.viewReportPage = false;
  this.casNumberFileter();
  } else if (selctedSearchDataProduct === '121856 LSR2680 TH/Drum kit/400Kg') {
  this.items$ = this.input$.pipe(
    map((term) => this.searchProduct(term, this.productLsr_Name))
  );
  this.LsrproductLevel = [];
  this.LsrMaterialLevel = this.MaterialLevel;
  this.LsrcomponentLevel = [];
  this.basicDetails = false;
  this.submitDetails = true;
  this.viewReportPage = false;
}
// else if(selctedSearchDataProduct == "121856 LSR2680 TH/Drum kit/400Kg"){
//   this.items$ = this.input$.pipe(
//     map((term) => this.searchProduct(term,this.productLsr_Name))
//   )
//   this.LsrMaterialLevel = this.MaterialLevel;
//   this.basicDetails = true;
//   this.intialDetails =false;
//   this.submitDetails =false;
// }


  } else if (data.length === 2) {
    const selctedSearchDataProduct = data[0].name;
    const selctedSearchMatId = data[1].name;
    if (selctedSearchDataProduct === 'LSR 2680FC A' && selctedSearchMatId === '121856 LSR2680 TH/Drum kit/400Kg' ) {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrMaterialLevel = this.MaterialLevel;
    } else if (selctedSearchDataProduct === 'LSR 2680FC A' && selctedSearchMatId === '68083-19-2') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrMaterialLevel = [];
      this.LsrcomponentLevel = this.componentLevel;
      this.LsrproductLevel = this.productLevel;
      this.casNumberFileter();
    } else if (selctedSearchDataProduct === '121856 LSR2680 TH/Drum kit/400Kg' && selctedSearchMatId === '68083-19-2') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrproductLevel = [];
      this.LsrMaterialLevel = this.MaterialLevel;
      this.LsrcomponentLevel = this.componentLevel;
    } else if (selctedSearchDataProduct === '68083-19-2' && selctedSearchMatId === '121856 LSR2680 TH/Drum kit/400Kg ') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrproductLevel = [];
      this.LsrMaterialLevel = this.MaterialLevel;
      this.LsrcomponentLevel = this.componentLevel;
    } else if (selctedSearchDataProduct === 'LSR 2680FC A' && selctedSearchMatId === 'OU EUROBIO LAB') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrcomponentLevel = [];
      this.LsrMaterialLevel = [];
      this.LsrproductLevel = this.productLevel;
      this.customerNameFilter();
    } else if (selctedSearchDataProduct === '68083-19-2' && selctedSearchMatId === 'OU EUROBIO LAB') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.LsrcomponentLevel = [];
      this.LsrMaterialLevel = [];
      this.LsrproductLevel = this.productLevel;
      this.customerNameFilter();
    }
    } else if (data.length === 3) {
      const selctedSearchDataProduct = data[0].name;
      const selctedSearchMatId = data[1].name;
      const selectedSearchCasNum = data[2].name;
      console.log(selectedSearchCasNum);
      // tslint:disable-next-line: max-line-length
      if (selctedSearchDataProduct === 'LSR 2680FC A' && selctedSearchMatId === '121856 LSR2680 TH/Drum kit/400Kg' && selectedSearchCasNum === '68083-19-2') {
      this.items$ = this.input$.pipe(
        map((term) => this.searchProduct(term, this.productLsr_Name))
      );
      this.casNumberFileter();
      this.LsrcomponentLevel = this.componentLevel;
    }
  } else if (data.length === 3) {
    const selctedSearchDataProduct = data[0].name;
    const selctedSearchMatId = data[1].name;
    const selectedSearchCasNum = data[2].name;
    console.log(selectedSearchCasNum);

    // tslint:disable-next-line: max-line-length
    if (selctedSearchDataProduct === 'LSR 2680FC A' && selctedSearchMatId === '68083-19-2' && selectedSearchCasNum === '121856 LSR2680 TH/Drum kit/400Kg') {
    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.productLsr_Name))
    );
    this.casNumberFileter();
    this.LsrcomponentLevel = this.componentLevel;
  }
} else if (data.length > 3) {
  this.searchRelatedMessage = true;
  this.basicBtn = false;
  this.submitDetails = false;
  this.viewReportPage = false;
} else {
    this.basicBtn = false;
    this.submitDetails = false;
    this.viewReportPage = false;
    this.searchRelatedMessage = true;
    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.product_Name))
    );

  }
}

  // fileter the Standard Composition-CAS Number
  casNumberFileter() {
    // tslint:disable-next-line: variable-name
    const CAS_data = '68083-19-2';
    this.standardCompositionData = this.copystandardCompositionData.filter((casNumber) => ( casNumber.CAS_Number  === CAS_data));
    console.log(this.standardCompositionData);
    this.hunderedCompositionData = this.copyhunderedCompositionData.filter((casNumber) => ( casNumber.CAS_Number  === CAS_data));
    console.log(this.hunderedCompositionData);
    this.legalCompositionData = this.copylegalCompositionData.filter((casNumber) => ( casNumber.CAS_Number  === CAS_data));
    console.log(this.legalCompositionData);
    }

customerNameFilter() {
  const CustomerNameData = 'OU EUROBIO LAB';
  this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData ));
  console.log(this.CommunicationHistoryData);
}

  clearCheck(data) {
    const dataCheck = data.label;
    if (dataCheck === '68083-19-2') {
    this.ngOnInit();
  } else if (dataCheck === 'OU EUROBIO LAB') {
    this.ngOnInit();
  }
}
intialSort() {
  return 0;
}
fireEvent(event) {
if (event === 'productDetails') {
  $('#basicDetails').modal('show');
}
}

unselect(): void {
   this.selectedBUValue = undefined;
   this.selectedProductValue = undefined;
   this.selectedCustomerValue = undefined;
}

getAddressData() {
  this.momentiveService.getSearchData().subscribe(data => {
    this.product_Name = data;
    console.log(this.product_Name);
  }, err => {
    console.error(err);
  });
}
MouseOut() {
  alert('check');
}

MouseModalBox(id: any, data: any) {
  const index = id;
  const Item = null;
  const extractData = data;
  const modalOpenData = extractData.value;
  modalOpenData.forEach(obj => {
    if (obj.tab_modal) {
      const ModalBoxId = obj.tab_modal;
      this.openId = '#' + ModalBoxId;
      $(this.openId).modal('show');
      this.selectItem(index, ModalBoxId, Item);
    }});
}
viewReport() {
  this.viewReportPage = true;
  this.submitDetails = false;
  this.basicDetails = false;
}
homepage() {
  this.submitDetails = true;
  this.viewReportPage = false;
  this.basicDetails = false;
}
topCheckBox(checkStatus, data) {
  if (checkStatus) {
    this.pdfIcon = true;
    data.tab_content.forEach(element => {element.checkValue = true;
                                         if (element.sub.length > 0) {
                                         element.sub.forEach(childelement => {childelement.checkValue = true;
    });
  }
    });
  } else {
    this.pdfIcon = false;
    this.viewReportPage = false;
    this.submitDetails = true;
    data.tab_content.forEach(element => {element.checkValue = false;
                                         if (element.sub.length > 0) {
                                         element.sub.forEach(childelement => {childelement.checkValue = false;
      });
    }
  });
}
}
subCheckBox(checkStatus,data,id) {
  console.log(id);
  this.parentObject = this.sidebarCategoriesData[id];
  console.log(this.parentObject);
  if (checkStatus) {
      this.pdfIcon = true;
      data.checkValue = true;
      let i = 0;
      this.parentObject.tab_content.forEach(element => {
     if (element.checkValue) {
       element.sub.forEach(childelement => { childelement.checkValue = true;
       });
       i++;
     }
     console.log(i, this.parentObject.tab_content.length);
     if (i === this.parentObject.tab_content.length) {
      this.parentObject.checkValue = true;
    }
     console.log(this.parentObject);
   });
   } else {
    this.pdfIcon = false;
    this.viewReportPage = false;
    this.submitDetails = true;
    data.checkValue = false;
    this.parentObject.checkValue = false;
    data.sub.forEach(element => { element.checkValue = false;
    });
   }
}
nextsubCheckBox(checkStatus, data, id) {
  console.log(checkStatus);
  console.log(data);
  console.log(id);
  this.parentObject = this.sidebarCategoriesData[id];
  console.log(this.parentObject);
  if (checkStatus) {
    this.pdfIcon = true;
    this.parentObject.tab_content[id].checkValue = true;
  } else if (this.parentObject.tab_content[id].name) {
      console.log(this.parentObject.tab_content[id].name);
      this.parentObject.tab_content[id].checkValue = false;
  } else {
    this.parentObject.tab_content[id].checkValue = true;
  }
  this.pdfIcon = false;
  this.viewReportPage = false;
  this.submitDetails = true;
  }
}
