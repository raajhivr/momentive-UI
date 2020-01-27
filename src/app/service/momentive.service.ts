import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from './../constants/constants';

//let url = environment.apiUrl;

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
    this.http.get('').subscribe(() => {
  })
  }


  //data: 'lsr', --Product Name
  //data: '121',  -- Material ID
  //data: '680'  --- CAS NUmber
  //data: 'MAT' ---MAT*121 Key
  //data: 'CAS' ---CAS Key


  // Staging API URL
  // http://40.114.45.9/product-search-data/{{data}}

  // getSearchProducts(data) {
  //   return this.http.post(url + "product-search-data", data);
  // }


        data :[
          {name: "LSR 2680FC A", product: "Nam Prod"},
          {name: "121856 LSR2680 TH/Drum kit/400Kg", product: "Material Id"}
        ]

  // getSearchRelavantData(data) {
  //   return this.http.post(url + "product-search-data", data);
  // }
  getAllEvents() {
    return this.http.get(Constants.SERVICES_DOMAIN + "all/products");
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
