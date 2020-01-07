import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from './../../service/momentive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// tslint:disable-next-line: class-name
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-ontology-documents',
  templateUrl: './ontology-documents.component.html',
  styleUrls: ['./ontology-documents.component.css']
})
export class OntologyDocumentsComponent implements OnInit {

  sideSearchData: any;
  dateForm: FormGroup;
  name = '';
  selectednav: 'active';
  secondaryNavBar = false;
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
  url: any;
  currentURL: any;
  sidebarIcon = true;


  extractFieldsForm: FormGroup;
  documentId: any;
  PDfOntology: any = [];
  ontologyFileDocuments: any = [];
  ontologyNewDocuments: any = [];
  ontologyPdfDocument: any;
  filename: any;
  productName: any;
  pdfUrl: any;
  Url: any;
  extractedFields: any = [];
  documentCategory: any = [];
  ontologyPdfFileData: any = [];
  ontologyProductsName: any = [];
  Product_Id: any = [];
  extarctPDFData: any = [];
  Newitems: any = [];
  keyselected: any = [];
  disabledCondition = true;
  ontology_Lsr_key: any = [];
  extractProductKey: any = [];
  ontologyExtractKey : any = [];
  extractKeys: any = [];
  disabledkey = true;
  objectKeys = Object.keys;
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', {static: false}) private codeRef?: ElementRef<HTMLElement>;

  

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private sanitizer: DomSanitizer,
              private momentiveService: MomentiveService) {
    this.reactiveForm = fb.group({
      Searchname: ['', Validators.required]
    });

    this.extractFieldsForm = this.fb.group({
      extractNamedetails: [''],
  }); 


    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.product_Name))
    );


  }

  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      this.documentId = params["document_id"];
      this.documentCategory = params["category_Name"];
      this.Product_Id = params["Product_Name"]
      console.log(this.documentId);
      console.log(this.documentCategory);
      console.log(this.Product_Id);
    });
    this.momentiveService.getOntologyDocuments().subscribe(data => {
      this.ontologyFileDocuments = data;
      this.ontologyProductsName = this.ontologyFileDocuments.ontology_documents;
      console.log(this.ontologyProductsName);
      this.PDfOntology = this.ontologyProductsName.filter((element) => (element.productName === this.Product_Id));
      console.log(this.PDfOntology);
      this.ontologyNewDocuments = this.PDfOntology.filter((element) => (element.category === this.documentCategory));
      console.log(this.ontologyNewDocuments);
      this.ontologyPdfFileData = this.ontologyNewDocuments[0][this.documentCategory].filter((element) => (element.id === this.documentId));
      console.log(this.ontologyPdfFileData);
      if (this.ontologyPdfFileData) {
        // this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
        this.extarctPDFData = this.ontologyPdfFileData[0].Extract_Field;
        console.log( this.extarctPDFData);
        this.extractKeys = this.extarctPDFData.ontology_Key;
        this.extractProductKey = this.extractKeys.split(',');
        console.log(this.extractProductKey);
         delete this.extarctPDFData.ontology_Key;
         console.log(this.extractKeys);

        this.extractProductKey.forEach(element => {
         this.keyselected.push({name:element, product: 'Nam Prod'});
        });
        console.log(this.keyselected);
        this.ontologyExtractKey = this.keyselected;
        console.log(this.ontologyExtractKey);
   
        // this.extractFieldsForm.controls.extractNamedetails.setValue( this.extarctPDFData);
      }
      this.filename = this.ontologyPdfFileData[0].fileName;
      this.productName = this.ontologyPdfFileData[0].productName;
      this.pdfUrl = this.ontologyPdfFileData[0].url;
      console.log(this.filename);
      console.log(this.productName);
      console.log(this.pdfUrl);
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log(this.Url);
});


  // Product Name
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.ontology_Lsr_key = this.productdata.Ontology_product_Name;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });
    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';
}


groupByFn = (item) => item.product;

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
  clearCheck(data) {
   console.log(data);
}
  onChangeData(data) {
    console.log(data);
     this.disabledCondition = false;
    }
  onFocused(data) {
  this.onChangeSearch(data);
  }


  submitProduct(data) {
    this.disabledkey = false;
  }

  setMyStyles() {
    const styles = {
      position: this.product_type.length > 16 ? 'absolute' : 'none',
    };
    return styles;
  }


createOwner(value) {
console.log(value);
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

intialSort() {
  return 0;
}


unselect(): void {
   this.selectedBUValue = undefined;
   this.selectedProductValue = undefined;
   this.selectedCustomerValue = undefined;
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
extractFields() {
  console.log(this.extractFieldsForm.value);
}
editOntology(data) {
  console.log(data);
  if (data) {
    this.disabledCondition = false;
    this.disabledkey = false;
  }

}
updateOntology(data) {
  console.log(data);
  this.disabledkey = false;
}
ReadOntology(data) {
  console.log(data);
}
documentKey(data) {
  console.log(data);
  }
}
