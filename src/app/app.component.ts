import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
	GridsterConfig,
	GridsterItem,
} from "angular-gridster2";
import {  Observable  } from "rxjs"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild("grid") grid: any;
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
	gridsterItemSel: GridsterItem;
	dashboardEdit: Array<GridsterItem>;
	isEditDashboard: Boolean = false;
  title = 'test-dynamic-grid';


  ngOnInit(){
    this.options = {
			displayGrid: "always",
			//
			draggable: {
				enabled: false,
			},
			resizable: {
				enabled: false,
			},
			swap: false,
			pushItems: true,
			maxCols: 7,
			// 7
			maxRows: 22,
		};

    this.dashboard = [
			{
				cols: 4,
				// 4
				rows: 22,
				y: 0,
				x: 0,
				type: "nod0",
				label: "Регион",
			},
			{
				cols: 1,
				// 1
				rows: 6,
				y: 0,
				x: 4,
				type: "nod0View",
				label: "Вид карты",
			},
			{
				cols: 1,
				//  2 1
				rows: 8,
				y: 12,
				x: 4,
				type: "nod0Legend",
				label: "Информация",
			},
			{
				cols: 2,
				// 4
				rows: 22,
				y: 0,
				x: 5,
				type: "overlayPanel",
				label: "Панель",
			},
			//
			// {
			// 	cols: 4,
			// 	rows: 1,
			// 	y: 10,
			// 	x: 0,
			// 	type: "footer",
			// 	label: "Бегущая строка",
			// },
		];

  }

  ngAfterViewInit(){

  }

  passMap(map: any){
    const that = this
    this.setMap(map).subscribe({
        complete(){
          let num = map.nativeElement.getBoundingClientRect().height/that.grid.curRowHeight
          if(!that.isInt(num)){
            num = num | 0
            num += 1
          }
          that.dashboard[0].rows = num
          that.options.api.optionsChanged()
        }
      })
  }

  setMap(map: any){
    let sizeH, sizeW
    const that = this
    sizeW = Number(map.nativeElement.firstChild.attributes[0].value.replace('px',''))
    sizeH = Number(map.nativeElement.firstChild.attributes[1].value.replace('px',''))
    function setRows(observer: any){
      setTimeout(() => {
        if(sizeW > sizeH){
          if(sizeW > that.grid.curColWidth*4)
            map.nativeElement.children[0].setAttribute(
                "style", `display: block; margin: auto; height: auto; width: 100%;`);
        } else{
            let h = document.documentElement.clientHeight/that.grid.curRowHeight | 0
            if(that.grid.curHeight/sizeH < 1)
              map.nativeElement.children[0].setAttribute(
                "style", `display: block; margin: auto; height: auto; width: ${that.grid.curRowHeight*h*sizeW/(sizeH*that.grid.curColWidth*4)*100}%`);
          }
        observer.complete()
        return {unsubscribe(){}}
      }, 5);
    }
    return new Observable(setRows)
  }

  passControls(map: any){
    const that = this

    this.setSizeOfMap(map, 2).subscribe({
      complete() {
        that.dashboard[2].y = that.dashboard[0].rows - that.dashboard[2].rows
        that.options.api.optionsChanged()
      },
    })

    // console.log(this.dashboard[0].rows - this.dashboard[2].rows);
    // this.dashboard[2].y = this.dashboard[0].rows - this.dashboard[2].rows
    // this.options.api.optionsChanged()
  }


  setSizeOfMap(map: any, n?: number){
    const that = this
    let size
    function setRows(observer: any){
      setTimeout(() => {
        let num = map.nativeElement.getBoundingClientRect().height/that.grid.curRowHeight
        if(!that.isInt(num)){
          num = num | 0
          num += 1
        }
        that.dashboard[n].rows = num
        that.options.api.optionsChanged()
        observer.complete()
        return {unsubscribe(){}}
      }, 100);
    }

    return new Observable(setRows)
  }

  isInt(n: any) {
    return n % 1 === 0;
  }


}
