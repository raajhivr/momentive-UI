import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    primaryInformtionTypes = true;
    ghsLabeling = false;
    structureAndFormulaTypes = false;
    compositionTypes = false;
    flowDiagrams = false;
    productAttributesCheck: any;
    selectedboxId: any;
    selectedId: any;
    modalValue: any;
    firstModal = false;
    secondModal = false;
    thirdModal = false;
    fourthModal = false;
    fifthModal = false;
    sixthModal = false;
    seventhModal = false;
    eightModal = false;
    radioItem: any;
    productTitle: any;
    ProductAttriData = [];

  sharingData: any;
  selectedData = new BehaviorSubject<any>(null);

  setData(data: any) {
    this.selectedData.next(data);
    console.log(data);
  }
  getData(): Observable<any> {
   return this.selectedData.asObservable();
  }

  constructor() {

  }






}
