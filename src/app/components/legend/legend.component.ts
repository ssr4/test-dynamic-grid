import { Component, OnInit, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: "../svg/legend.svg"
  // templateUrl: './legend.component.html',
  // styleUrls: ['./legend.component.css']
})
export class LegendComponent implements OnInit, AfterViewInit {
  @Output() passMap = new EventEmitter<ElementRef>();
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
     // центрируем блок по центру
		this.elementRef.nativeElement.firstChild.setAttribute(
			"style", "display: block; margin: auto;width: 100%; height: 20%"
		);

    this.passMap.emit(this.elementRef);
  }

}
