import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Md5 } from './../helpers/md5';

@Directive({
  selector: '[appGravatar]'
})
export class GravatarDirective implements OnInit {

  @Input() set email(value: string) {
    this.updateEmail(value);
    console.log('in directive input');
  }
  fallback = 'wavatar'; // https://en.gravatar.com/site/implement/images/

  constructor(private el: ElementRef) {
    console.log('in directive const');
  }

  ngOnInit(): void {
    if (this.el) {
      this.el.nativeElement.src = `//www.gravatar.com/avatar/`;
    }
  }

  updateEmail(email: string): void {
    if (!email || !this.el.nativeElement) {
      console.log('in update email');
      return;
    }

    const emailHash = Md5.hashStr(email.trim().toLowerCase());
    this.el.nativeElement.src =
      `//www.gravatar.com/avatar/${emailHash}?d=${this.fallback}`;
  }
}
