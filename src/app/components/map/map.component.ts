import { Component, EventEmitter, Output, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  // templateUrl: './map.component.html',
  templateUrl: "../svg/map.svg"
})


export class MapComponent implements OnInit, AfterViewInit {
  @Output() passMap = new EventEmitter<ElementRef>();
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {



  }

  ngAfterViewInit(){
    // центрируем блок по центру
		// this.elementRef.nativeElement.children[0].setAttribute(
		// 	"style", "display: block; margin: auto;width: 100%; height: 100%"
		// );

    this.passMap.emit(this.elementRef);
  }

}
