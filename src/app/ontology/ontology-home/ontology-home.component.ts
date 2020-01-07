import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from './../../service/momentive.service';
import { Router, ActivatedRoute , NavigationStart, NavigationExtras } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-ontology-home',
  templateUrl: './ontology-home.component.html',
  styleUrls: ['./ontology-home.component.css']
})
export class OntologyHomeComponent implements OnInit {

  ontologyFileDocuments: any = [];
  ontologyNewDocuments: any = [];
  PDfOntology: any = [];
  documentCategory: any;
  documentCategorySection = false;
  productIdFilter: any



  constructor(private route: ActivatedRoute,
              private router: Router, private momentiveService: MomentiveService) {
               }

  ngOnInit() {
    this.documentCategory = localStorage.getItem('ontologyDocumets');

    if (localStorage.getItem('ontologyDocumets') === null) {
      this.documentCategorySection = true;
    }
    console.log(this.documentCategory);
      // tslint:disable-next-line: align
        this.momentiveService.getOntologyDocuments().subscribe(data => {
        this.ontologyFileDocuments = data;
        this.PDfOntology = this.ontologyFileDocuments.ontology_documents;
        this.PDfOntology = this.PDfOntology.filter((element: { productName: any; }) => (element.productName === this.documentCategory));
        console.log(this.PDfOntology);
        // tslint:disable-next-line: max-line-length
      }, err => {
        console.error(err);
      });

      $("a.collapsed").click(function(){
        $(this).find(".btn:contains('answer')").toggleClass("collapsed");
    });

  }


 ontologyDocuments(id: any, categeory: any) {
   console.log(id);
   const navigationExtras: NavigationExtras = {
    queryParams: {
      'document_id' : id,
      'category_Name': categeory,
      'Product_Name': localStorage.getItem('ontologyDocumets')
    }
  };
   this.router.navigate(['ontology/ontology-documents'], navigationExtras);
 }

 expand() {
    $('.collapse').collapse('show');
    }
collapse() {
    $('.collapse').collapse('hide');
}
}
