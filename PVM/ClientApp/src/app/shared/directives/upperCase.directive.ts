import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: 'input[uppercaseDirective]',
    host: {
        '(input)': 'ref.nativeElement.value=$event.target.value.toUpperCase()',
    }

})
export class UppercaseDirective {
    constructor(private ref: ElementRef) {
    }
}
