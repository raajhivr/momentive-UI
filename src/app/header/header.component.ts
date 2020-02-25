import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import { TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { HomeService} from '../service/home-service.service';
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  sideSearchData: any;
  name = '';
  selectednav: 'active';
  secondaryNavBar = false;
  placeholder: string;
  keyword: string;
  historyHeading: string ;
  product_Name: any = [];
  reactiveForm: FormGroup;
  product_type: any = [];
  copyproduct_type: any = [];
  compositionPart: any = [];
  value: string;
  type: string;
  cols: any[];


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
  product_NameData: any[];
  sidebarData: any;
  copysidebarData: any = [];
  productLsr_Name: any = [];
  productSilsoft_Name: any = [];
  Searchname: any;
  productCAS_Number: any;
  basicDetails = true;
  submitDetails = false;
  intialData_Details: any = [];
  productLevel: any = [];
  MaterialLevel: any = [];
  componentLevel: any = [];
  LsrproductLevel: any = [];
  LsrMaterialLevel: any = [];
  LsrcomponentLevel: any = [];
  HomeDataDetails: any = [];
  basicBoxDetails = false;
  sidenavDetails: any;
  searchRelatedMessage = false;
  // New Data;
  productdata: any = [];
  url: any;
  currentURL: any;
  sidebarIcon = true;
  newEvents:any = [];

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


    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.product_Name))
    );


  }

  ngOnInit() {
    localStorage.clear();
    this.url = window.location.href.includes('home');
    console.log(this.url);

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

  this.momentiveService.getAllEvents().subscribe(data => {
    if (data) {
        this.newEvents = data;
        console.log(data);
    }
}, err => {
    console.log(err);
})


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
                    name: 'Notification Status', id: 1,
                  },
                  {
                    name: 'AG Registration Status', id: 2,
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
                    name: 'US FDA Letter', id: 1,
                  },
                  {
                    name: 'EU Food Contact', id: 2,
                  },
                  {
                    name: 'Heavy Metals Composition', id: 3,
                  },
                  {
                    name: 'Communication History', id: 4,
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
  if (searchTerm.length > 2) {
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
  localStorage.clear();
  localStorage.setItem('synonymsOntology', JSON.stringify(data))
  this.sideSearchData = true;
  console.log(this.sideSearchData);
  this.submitDetails = true;
  this.secondaryNavBar = true;
  console.log(data.length);
  if (data.length === 0) {
    this.basicDetails = true;
    this.router.navigate(['/app-pageindex']);
    this.secondaryNavBar = false;
  }
  if (data.length === 1) {
  this.router.navigate(['/app-home']);
  this.secondaryNavBar = true;
  const selctedSearchDataProduct = data[0].name;
  console.log(selctedSearchDataProduct);
  if (selctedSearchDataProduct === 'LSR 2680FC A') {
  localStorage.setItem('viewReportId', 'LSR 2680FC A');
  this.basicDetails = false;
  this.submitDetails = true;
  this.router.navigate(['/app-home']);
  this.basicBoxDetails = true;
  this.items$ = this.input$.pipe(
    map((term) => this.searchProduct(term, this.productLsr_Name))
  );
  this.LsrcomponentLevel = [];
  this.LsrMaterialLevel = [];
  this.LsrproductLevel = this.productLevel;

 } else if (selctedSearchDataProduct === '68083-19-2') {
  localStorage.setItem('ontologyCASDocumets', '68083-19-2');
  // this.LsrproductLevel = this.productLevel;
  this.router.navigate(['/app-home']);
 } else if (selctedSearchDataProduct === 'LSR2050') {
  localStorage.setItem('ontologyDocumets', 'LSR2050');
  // this.LsrproductLevel = this.productLevel;
  this.router.navigate(['/app-home']);
 } else if (selctedSearchDataProduct === 'LSR2650') {
  localStorage.setItem('ontologyDocumets', 'LSR2650');
  this.router.navigate(['/app-home']);
  // this.LsrproductLevel = this.productLevel;
 } else if (selctedSearchDataProduct === '68083-19-2') {
  this.items$ = this.input$.pipe(
    map((term) => this.searchProduct(term, this.productLsr_Name))
  );
  this.LsrproductLevel = [];
  this.LsrMaterialLevel = [];
  this.LsrcomponentLevel = this.componentLevel;
  this.basicDetails = false;
  this.submitDetails = true;
  this.router.navigate(['/app-home']);
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
  this.router.navigate(['/app-home']);
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
  this.submitDetails = false;
  this.router.navigate(['/app-pageindex']);
} else {
    localStorage.clear();
    this.submitDetails = false;
    this.router.navigate(['/app-pageindex']);
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
fireEvent(event) {
  if (event === 'productDetails') {
    $('#basicDetails').modal('show');
  }
  }
  clearCheck(data) {
    localStorage.clear();
    console.log(data);
 }

 Ongtology() {
     this.router.navigate(['/app-ontology-home']);
   }
   changePage(url,data) {
     if (data) {
      this.sidebarIcon = true;
     } else {
      this.sidebarIcon = false;
     }
    this.router.navigate(['/'+ url]);
   }
   UnassignedDocuments() {
    this.router.navigate(['/ontology'])
   }
   OntologyMasterManagement() {
    this.router.navigate(['/ontology/synonyms']);
   }
   home() {
    this.router.navigate(['/app-pageindex']);
   }
  
}
