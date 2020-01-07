import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule} from 'primeng/table';
import { NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DropdownModule} from 'primeng/primeng';
import { MultiSelectModule} from 'primeng/primeng';
import { EditorModule, SharedModule, ButtonModule} from 'primeng/primeng';
import {InputTextModule, SliderModule} from 'primeng/primeng';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { OntologyComponent } from './ontology.component';
import { OntologyHomeComponent } from '../ontology/ontology-home/ontology-home.component';
import { OntologyDocumentsComponent } from '../ontology/ontology-documents/ontology-documents.component';
import { SynonymsComponent } from '../ontology/synonyms/synonyms.component';


const routes: Routes = [
      { path: '', component: OntologyHomeComponent},
      { path: 'ontology-documents', component: OntologyDocumentsComponent },
      { path: 'synonyms', component: SynonymsComponent }
];

@NgModule({
  declarations: [OntologyHomeComponent, OntologyComponent, SynonymsComponent, OntologyDocumentsComponent],
  imports: [FormsModule, ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
    TableModule,
    SharedModule,
    ButtonModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    InputTextModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OntologyRoutingModule { }
