import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'animal-crossing-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  public villagerInfo!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.villagerInfo = new FormGroup({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      email: new FormControl({value: '', disabled: false}, Validators.email),
      favorites: new FormArray([
        new FormControl({value: '', disabled: false}, Validators.required),
        new FormControl({value: '', disabled: false}, Validators.required),
        new FormControl({value: '', disabled: false}, Validators.required),
      ]),
      flowers: new FormArray([
        new FormGroup({
          type: new FormControl({value: '', disabled: false}),
          color: new FormControl({value: '', disabled: false})
        }),
        new FormGroup({
          type: new FormControl({value: '', disabled: false}),
          color: new FormControl({value: '', disabled: false})
        })
      ])
    })
  }

  get favorites(): FormArray {
    return this.villagerInfo.get('favorites') as FormArray;
  }

  get flowers(): FormArray {
    return this.villagerInfo.get('flowers') as FormArray;
  }

}
