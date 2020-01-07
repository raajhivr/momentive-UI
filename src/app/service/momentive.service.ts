import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// let url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MomentiveService {
  invokeEvent: Subject<any> = new Subject();
  /**
   * Observable string streams
   */
  notifyObservable$ = this.invokeEvent.asObservable();


  constructor(private http: HttpClient) {
    this.http.get('').subscribe((ipOfNetwork) => {
  })
  }


callMethodOfSecondComponent(data) {
    this.invokeEvent.next(data);
  }
getSearchData() {
    return this.http.get('../../assets/momentive.json');
}
getOntologyDocuments() {
  return this.http.get('../../assets/ontology.json');
}
  
}
