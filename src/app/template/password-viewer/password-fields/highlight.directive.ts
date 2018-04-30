import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightColor: string;

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    
  }

  constructor(private el: ElementRef) {
    this.highlight(null);
 }


@HostListener('blur') ononblur() {
  this.highlight(null);
}

@HostListener('focus') onfocus() {
  this.highlight(this.highlightColor || 'yellow');
}


}
