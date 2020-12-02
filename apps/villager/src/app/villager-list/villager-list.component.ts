import { VillagerStateService } from './villager-state.service';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Villager, Personality, Species, Hobby, VillagerSortOptions, AcnhService} from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatExpansionPanel} from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'animal-crossing-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.less']
})
export class VillagerListComponent implements OnInit {
  @ViewChild(MatExpansionPanel) accordion!: MatExpansionPanel;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  public displayedVillagers$!: Observable<Villager[]>;
  private checkSelection: VillagerSortOptions[] = [];
  public sortOptions = ["personality", "species", "hobby", "birthday"];
  public checkBoxList = [
    {
      attribute: 'personality',
      list: Object.values(Personality)
    },
    {
      attribute: 'species',
      list: Object.values(Species)
    },
    {
      attribute: 'hobby',
      list: Object.values(Hobby)
    }
  ]

  constructor(private stateService: VillagerStateService) { }

  ngOnInit(): void {
    this.stateService.loadVillagers();
    this.displayedVillagers$ = this.stateService.state$.pipe(
      map((state) => this.stateService.updateDisplayedVillagers(state)),
      tap((state) => console.log('state changed', state))
    )
  }

  filterList() {
    this.accordion.close();
    this.stateService.selectFilters(this.checkSelection);
  }

  showFavorites(change: MatCheckboxChange) {
    this.accordion.close();
    this.stateService.showFavorites(change.checked);
  }

  setSort(value: VillagerSortOptions) {
    this.stateService.selectSort(value);
  }

  checkboxChecked(change: MatCheckboxChange) {
    const checkedValue = change.source.value as VillagerSortOptions;
    this.checkSelection  = change.checked ? [...this.checkSelection, checkedValue] : this.checkSelection.filter(item => item !== checkedValue)
  }

  favoriteVillager(event: any, villagerToFav: Villager) {
    event.stopPropagation();
    this.stateService.favoriteVillager(villagerToFav);
  }

  reset() {
    this.stateService.resetSortFilter();
    this.checkSelection = [];
    this.checkboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        checkbox.toggle();
      }
    })
  }

}
