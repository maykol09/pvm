import { Component, OnInit } from "@angular/core";
import { DataSharedService } from '../service/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit{
  constructor(private dataService : DataSharedService) {

  }
  ngOnInit() {
    this.dataService.navMenu.subscribe(data => {
      var x = <HTMLInputElement>document.getElementById("footer");
      if (data) {
        x.style.display = "none"
      } else {
        x.style.display = ""
      }
    })
  }
}
