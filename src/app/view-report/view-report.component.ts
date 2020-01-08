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
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import * as jsPDF from 'jspdf';
declare var $: any;


@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  SelectAllcheckValue = false;
  userFilter: any = { Name: '' };
  name = '';
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  sidebarCategoriesData: any = [];
  viewReportPage = false;
  noReportPage = false;
  viewIntialPage = true;
  sidenavDetails: any;
  parentObject: any;
  pdfIcon = false;
  searchRelatedMessage = false;
  // New Data;
  productdata: any = [];
  productApplication:any =[];

  // Report Code

  firstcCategories = false;
  secondCategories = false;
  thirdCategories = false;

  viewReportId: any;
  objectKeys = Object.keys;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeService: HomeService,
              private momentiveService: MomentiveService) {


  }

  ngOnInit() {
    this.viewReportId = localStorage.getItem('viewReportId');

    if (localStorage.getItem('viewReportId') === null) {
      this.noReportPage = true;
      this.viewReportPage = false;
      this.viewIntialPage = false;
    }

    // sidebarCategoriesDat

    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
      console.log(this.sidebarCategoriesData);
    }, err => {
      console.error(err);
    });

    this.productApplication = [
      { app_id: 1, app_text: 'Dental / surgical devices' },
      { app_id: 2, app_text: 'Diagnostics / imaging' },
      { app_id: 3, app_text: 'Fluid and drug delivery devices' },
      { app_id: 4, app_text: 'Orthopedics / prosthetics' },
      { app_id: 5, app_text: 'Advanced Wound Care & Scar Management' },
      { app_id: 6, app_text: 'Septa / stoppers / laboratory accessories' },
      { app_id: 7, app_text: 'Wound drains and bulbs' },
      { app_id: 8, app_text: 'Sterilization mats' },
      { app_id: 9, app_text: 'Pharmaceutical closures' },
      { app_id: 10, app_text: 'Positioning devicess' },
      { app_id: 11, app_text: 'Catheters' },
      { app_id: 12, app_text: 'Seals / dialysis o-rings / valves' },
      { app_id: 13, app_text: 'Respiratory / anesthesia' },
      { app_id: 14, app_text: 'Medical equipment keypads' },
    ];
    

  }









  selectEvent(item) {
    // do something with selected item
    console.log(item);
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








intialSort() {
  return 0;
}







public downloadAsPDF() {
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#editor': function (element, renderer) {
      return true;
    }
  };
  const pdfTable = this.pdfTable.nativeElement;
  doc.fromHTML(pdfTable, 0, 0, {
     width: 400, // max width of content on PDF
    'elementHandlers': specialElementHandlers
},
function(bla){doc.save('Momentive.pdf');},
0);
  
}

SelectAllCategories(checkStatus) {
  console.log(checkStatus);
  if (checkStatus) {
    this.sidebarCategoriesData.forEach(element => { element.checkValue = true;

    });
  } else {
    this.sidebarCategoriesData.forEach(element => {element.checkValue = false;
});
  }

}
topCheckBox(checkStatus, data) {
  console.log(checkStatus)
  console.log(data);
  if (checkStatus) {
    if (this.viewReportId === 'LSR 2680FC A') {
      this.viewReportPage = true;
      this.noReportPage = false;
      this.viewIntialPage = false;
    } 
    data.tab_content.forEach(element => {element.checkValue = true;
         if (element.sub.length > 0) {
      element.sub.forEach(childelement => {childelement.checkValue = true;
    });
  }
    });
  } else {
    this.viewIntialPage = true;
    this.viewReportPage = false;
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
  }

}
