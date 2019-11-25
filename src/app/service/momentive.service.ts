import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

// let url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MomentiveService {

  constructor(private http: HttpClient) { 
    this.http.get('').subscribe((ipOfNetwork) => {
  })
  }

  getSearchData() {
    return this.http.get('../../assets/momentive.json');
}
}
