import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

import { ArrowFunction } from 'typescript';

@Directive({
  selector: '[appShortKeys]'
})
export class ShortKeysDirective {
 @Input()
  appKeys!: Function;
  @Output() appKeysChange!: EventEmitter<Function>;
  constructor(private el: ElementRef) { }

  @HostListener('window:keydown.shift.z') 
  onKeyUp() {
    this.appKeys();
   
   
  }

}
