import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
// import jsPDF from 'jspdf';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

//  @ViewChild('content') content: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  makePdf() {
    // const doc = new jsPDF({
    //   orientation: 'landscape',
    //   unit: 'in',
    //   format: [4, 2]
    // });
    // doc.addHTML(this.content.nativeElement, function() {
    //    doc.save('momentiive.pdf');
    // });
  }
}
