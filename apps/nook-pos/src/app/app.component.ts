import { Component } from '@angular/core';

@Component({
  selector: 'animal-crossing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'nook-pos';
  public myFormObject = {
    name: '',
    id: '',
    items: [
      {
        name: '',
        price: ''
      }
    ]
  }

  addItem() {
    this.myFormObject.items.push({name: '', price: ''})
  }
}
