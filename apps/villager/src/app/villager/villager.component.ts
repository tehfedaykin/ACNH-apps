import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Villager, AcnhService} from '@animal-crossing/api';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ac-villager',
  templateUrl: './villager.component.html',
  styleUrls: ['./villager.component.less']
})
export class VillagerComponent implements OnInit {
  public villager$!: Observable<Villager>;
  constructor(private route: ActivatedRoute, private apiService: AcnhService) { }

  ngOnInit(): void {
    this.villager$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.apiService.getVillager(params.get('id') as string)
      })
    )
  }

}
