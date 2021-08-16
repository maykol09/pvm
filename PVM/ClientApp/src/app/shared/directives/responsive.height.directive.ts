import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
  selector: '[responsiveHeightDirective]',

})
export class ResponsiveHeightDirective implements AfterViewInit {
  element: any;
  offSetTop: any;
  minHeight: any;

  constructor(private elRef: ElementRef) {
    this.element = $(elRef.nativeElement);
    this.offSetTop = elRef.nativeElement.getAttribute('offSetTop');
    this.offSetTop = (this.offSetTop != null) ? parseInt(this.offSetTop) : 45;

    this.minHeight = elRef.nativeElement.getAttribute('minHeight');
    this.minHeight = (this.minHeight != null) ? parseInt(this.minHeight) : 0;
  }

  ngAfterViewInit(): void {
    var jqWindow = $(window);
    this.resizeElement();

    jqWindow.resize(this.resizeElement);
  }

  private resizeElement = () => {
    var jqWindow = window.innerHeight;
    var offSetTop = this.offSetTop;
    var element = this.element;
    var minHeight = this.minHeight;
    setTimeout(function () {
      var newHeight = ((jqWindow - offSetTop - 10) - element.offset().top);
      var strNewHeight = (newHeight < minHeight) ? (jqWindow - offSetTop) - 150 : newHeight.toString();


      element.height(strNewHeight);
    })
    
  }

}
