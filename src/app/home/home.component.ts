import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
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
import { SharedService } from '../service/shared.service';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
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
  @Input()radioItem: any;
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
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();

  @ViewChild('code', {static: false}) private codeRef?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeService: HomeService,
              private momentiveService: MomentiveService,
              private sharedService: SharedService) {
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
      this.productdata = data;
      this.product_Name = this.productdata.product_Name;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });
// LSR 2680FC
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.productLsr_Name = this.productdata.productLsr_Name;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });

// Silsoft
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.productSilsoft_Name = this.productdata.productSilsoft_Name;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });

// CAS NUMBER 556-67-2
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.productCAS_Number = this.productdata.productCAS_Number;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });
  // intialData_Details

    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.intialData_Details = this.productdata.intialData_Details;
    console.log(this.productdata);
  }, err => {
    console.error(err);
  });

   // sidebarCategoriesDat
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
    console.log(this.sidebarCategoriesData);
  }, err => {
    console.error(err);
  });

   // LSR Basic Details

   // Product Level
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.productLevel = this.productdata.productLevel;
    console.log(this.productLevel);
  }, err => {
    console.error(err);
  });

  // MaterialLevel
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.MaterialLevel = this.productdata.MaterialLevel;
    console.log(this.MaterialLevel);
  }, err => {
    console.error(err);
  });

  // componentLevel
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.componentLevel = this.productdata.componentLevel;
    console.log(this.componentLevel);
  }, err => {
    console.error(err);
  });

  // product_type
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.product_type = this.productdata.product_type;
    console.log(this.product_type);
  }, err => {
    console.error(err);
  });
    // sales_Report
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.salesReport = this.productdata.salesReport;
      console.log(this.salesReport);
    }, err => {
      console.error(err);
    });
    // sidebarData
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarData = this.productdata.sidebarData;
      console.log(this.sidebarData);
      if (this.sidebarData.length > 16) {
        this.sidebarTopIcon = true;
      }
    }, err => {
      console.error(err);
    });
    // sidebarCategoriesDat

    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
      console.log(this.sidebarCategoriesData);
    }, err => {
      console.error(err);
    });
    // compositionPart

    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.compositionPart = this.productdata.compositionPart;
      console.log(this.compositionPart);
    }, err => {
      console.error(err);
    });

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

      // regionPart
    this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.regionPart = this.productdata.regionPart;
        console.log(this.regionPart);
      }, err => {
        console.error(err);
      });
    // ProductAttributeCheck
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      console.log(this.productdata);
      this.productAttributeCheck = this.productdata.productAttributeCheck;
      console.log(this.productAttributeCheck);
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
  // customerCommunicationChecks
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.customerCommunicationChecks = this.productdata.customerCommunicationChecks;
    console.log(this.customerCommunicationChecks);
  }, err => {
    console.error(err);
  });
    // restrictedSubstanceChecks
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.restrictedSubstanceChecks = this.productdata.restrictedSubstanceChecks;
      console.log(this.restrictedSubstanceChecks);
    }, err => {
      console.error(err);
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
    // salesCheckData
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.salesCheckData = this.productdata.salesCheckData;
      console.log(this.salesCheckData);
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

// legalProducts
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.legalProducts = this.productdata.legalProducts;
  console.log(this.legalProducts);
}, err => {
  console.error(err);
});
// ghsLabelingHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.ghsLabelingHeader = this.productdata.ghsLabelingHeader;
  console.log(this.ghsLabelingHeader);
}, err => {
  console.error(err);
});
//ghsLabelingData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.ghsLabelingData = this.productdata.ghsLabelingData;
  console.log(this.ghsLabelingData);
}, err => {
  console.error(err);
});
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
// saleDataHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.saleDataHead = this.productdata.saleDataHead;
  console.log(this.saleDataHead);
}, err => {
  console.error(err);
});
// saleDataProducts
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  console.log(this.productdata);
  this.saleDataProducts = this.productdata.saleDataProducts;
  console.log(this.saleDataProducts);
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

// restrictedGASDLHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.restrictedGASDLHeader = this.productdata.restrictedGASDLHeader;
  console.log(this.restrictedGASDLHeader);
}, err => {
  console.error(err);
});
// restrictedGASDLData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.restrictedGASDLData = this.productdata.restrictedGASDLData;
  console.log(this.restrictedGASDLData);
}, err => {
  console.error(err);
});
// restrictedCaliforniaHeader
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.restrictedCaliforniaHeader = this.productdata.restrictedCaliforniaHeader;
  console.log(this.restrictedCaliforniaHeader);
}, err => {
  console.error(err);
});
// restrictedCaliforniaData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.restrictedCaliforniaData = this.productdata.restrictedCaliforniaData;
  console.log(this.restrictedCaliforniaData);
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
//complianceRegistrationEUData
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
// ccHeavyMetals_Data
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.ccHeavyMetals_Data = this.productdata.ccHeavyMetals_Data;
  console.log(this.ccHeavyMetals_Data);
}, err => {
  console.error(err);
});

// legalCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.legalCompositionHead = this.productdata.legalCompositionHead;
  console.log(this.legalCompositionHead);
}, err => {
  console.error(err);
});

// legalCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.legalCompositionData = this.productdata.legalCompositionData;
  console.log(this.legalCompositionData);
}, err => {
  console.error(err);
});


// hunderedCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.hunderedCompositionHead = this.productdata.hunderedCompositionHead;
  console.log(this.hunderedCompositionHead);
}, err => {
  console.error(err);
});

// hunderedCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.hunderedCompositionData = this.productdata.hunderedCompositionData;
  console.log(this.hunderedCompositionData);
}, err => {
  console.error(err);
});


// standardCompositionHead
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.standardCompositionHead = this.productdata.standardCompositionHead;
  console.log(this.standardCompositionHead);
}, err => {
  console.error(err);
});

// standardCompositionData
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.standardCompositionData = this.productdata.standardCompositionData;
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
// intialDataDetails
    this.momentiveService.getSearchData().subscribe(data => {
  this.productdata = data;
  this.intialDataDetails = this.productdata.intialDataDetails;
  console.log(this.intialDataDetails);
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


 
    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';

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
      this.sidebarData = this.copysidebarData.filter((element) => (element.customer_name === customerName)); 
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
  console.log(this.selectedId);
  this.value = data;
  this.radiovalue = radiodata;
   this.productRadioBox(index, this.value, this.radiovalue);
}

  productRadioBox(index, value, Item) {
    console.log(index);
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
    // this.onChangeProductAttribute(this.radioItem);
    // this.momentiveService.setSelectedTab(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);

  } else if ( this.modalValue === 'complianceModal') {
    this.productTitle = 'Product Complaince';
    this.secondModal = true;
    // this.onChangeProductCompliance(this.radioItem);
    
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'communicationModal') {
    this.productTitle = 'Customer Communication';
    this.thirdModal = true;
    // this.onChangeCommunication(this.radioItem);
    
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'restrictedSubstanceModal') {
    this.productTitle = 'Restricted Substance';
    this.fourthModal = true;
    // this.onChangeRestricted(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'toxicologyModal') {
    this.productTitle = 'Toxicology';
    this.fifthModal = true;
    // this.onChangeToxicology(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'salesModal') {
    this.productTitle = 'Sales Information';
    this.sixthModal = true;
    // this.onChangeSales(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
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

}

MouseModalBox(id: any, data: any) {
  const index = id;
  const Item = null;
  const extractData = data;
  const modalOpenData = extractData.value;
  modalOpenData.forEach(obj => {
    if (obj.tab_modal) {
      const ModalBoxId = obj.tab_modal;
      setTimeout(function() {
          this.openId = '#' + ModalBoxId;
          console.log(this.openId);
          $(this.openId).modal('show');
       }, 100);
      this.selectItem(index, ModalBoxId, Item);
    }});
}

}
