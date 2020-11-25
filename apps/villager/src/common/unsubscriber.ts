import { Subject } from 'rxjs';
import { OnDestroy, Component } from '@angular/core';

@Component({
  template: ''
})
export class Unsubscriber implements OnDestroy {
  protected _unsubscriber: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnDestroy(): void {
      console.log('unsubscribe in ondestory');
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }
}