import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UtilitiesService } from '../service/utilities.service';
import { DataSharedService } from '../service/data.service';
import { Location } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VacantPostsModalComponent } from './vacant-posts/vacant-posts.component';
import { InactivePostsModalComponent } from './inactive posts/inactive-posts.component';
import { SelectionModalComponent } from './selection/selection.component';
import { PositionCreatedModalComponent } from './position-created/position-created.component';


const MODALS = {
  vacant_posts: VacantPostsModalComponent,
  inactive_posts : InactivePostsModalComponent,
  selection: SelectionModalComponent,
  position_created: PositionCreatedModalComponent
};
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnDestroy, OnInit {
  subscription: any;
  isExpanded = false;
  formControl = <any>[];
  username: any;
  dataFromForm: any;
  noAccess: boolean = false;
  constructor(private route: Router,
    private utilities: UtilitiesService, private dataService: DataSharedService,
    private router: ActivatedRoute, private location: Location,
    private modal: NgbModal) {
   
    this.dataService.navMenu.subscribe(data => {
      this.noAccess = data;
    })

    this.dataService.users.subscribe((data: {}) => {
      this.username = data;
    })
  }
  ngOnInit() {
    this.dataService.navMenu.subscribe(data => {
      var x = <HTMLInputElement>document.getElementById("myTopnav");
      if (data) {
        x.style.display = "none"
      } else {
        x.style.display = ""
      }
    })
  }
  myFunction() {
    var x = <HTMLInputElement>document.getElementById("myTopnav");
    var icon = <HTMLInputElement>document.getElementById("menuIcon");

    if (x.className === "topnav") {
      x.className += " responsive";
      icon.style.display = "";
    } else {
      x.className = "topnav";
      icon.style.display = "none";
    }
  }
  menuClose() {
    var x = <HTMLInputElement>document.getElementById("myTopnav");
    var icon = <HTMLInputElement>document.getElementById("menuIcon");
    x.className = "topnav";

    icon.style.display = "none";
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  routes(route: string) {
    this.menuClose();
    if (route === 'vacant_posts') {
      const modalRef = this.modal.open(MODALS['vacant_posts'], {
        backdrop: 'static', keyboard: false,
      });
      modalRef.result.then(data => {

      })
    } else if (route === 'inactive_posts') {
      const modalRef = this.modal.open(MODALS['inactive_posts'], {
        backdrop: 'static', keyboard: false,
      });
      modalRef.result.then(data => {

      })
    } else if (route === 'selection') {
      const modalRef = this.modal.open(MODALS['selection'], {
        backdrop: 'static', keyboard: false,
      });
      modalRef.result.then(data => {

      })
    } else if (route === 'position_created') {
       const modalRef = this.modal.open(MODALS['position_created'], {
        backdrop: 'static', keyboard: false,
      });
      modalRef.result.then(data => {

      })
    } {
      this.route.navigate([route]);
    }
    
  }
}
