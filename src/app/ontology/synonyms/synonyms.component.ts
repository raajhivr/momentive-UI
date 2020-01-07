import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentiveService} from './../../service/momentive.service';
declare var $: any;


@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {

  synonymsFieldsForm: FormGroup;
  addField = false;
  ontologySynonymsDocuments: any = [];
  Ontologysynonyms: any = [];
  PDfOntology: any = [];
  documentCategory: any;
  documentCategorySection = false;

  constructor(private formBuilder: FormBuilder, private momentiveService: MomentiveService) {

  this.synonymsFieldsForm = new FormGroup({
    synonymsFieldName: new FormControl()
 });

  }

  ngOnInit() {
    this.documentCategory = localStorage.getItem('ontologyDocumets');

    if (localStorage.getItem('ontologyDocumets') === null) {
      this.documentCategorySection = true;
    }
    console.log(this.documentCategory);
    if (this.documentCategory === 'LSR2050' ) {
      this.momentiveService.getOntologyDocuments().subscribe(data => {
        this.ontologySynonymsDocuments = data;
        this.Ontologysynonyms = this.ontologySynonymsDocuments.synonyms_LSR2050;
        console.log(this.Ontologysynonyms);
      }, err => {
      console.error(err);
    });
  } else if (this.documentCategory === 'LSR2650') {
    this.momentiveService.getOntologyDocuments().subscribe(data => {
      this.ontologySynonymsDocuments = data;
      this.Ontologysynonyms = this.ontologySynonymsDocuments.synonyms_LSR2650;
      console.log(this.Ontologysynonyms);
    }, err => {
    console.error(err);
  });
  }
  $('[data-toggle="tooltip"]').tooltip();
  const $a = $('.tabs li');
  $a.click(function() {
    $a.removeClass('active');
    $(this).addClass('active');
  });
}

  // synonymsFields() {
  //  this.addField = true;
  // }
  addSynonyms() {
    console.log(this.synonymsFieldsForm.value);
  }
  closeSynonyms() {
    this.addField = false;
  }
}
