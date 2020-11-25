import { AcnhService } from './../../../../../libs/api/src/lib/acnh.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'animal-crossing-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  public items;
  constructor(private route: ActivatedRoute, private apiService: AcnhService) { }

  ngOnInit(): void {
  }

}
