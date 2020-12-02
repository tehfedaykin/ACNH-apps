import { getDisplayVillagers } from './../+state/selectors';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Villager, Personality, Species, Hobby, VillagerSortOptions } from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatExpansionPanel} from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import * as VillagerActions from '../+state/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'animal-crossing-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.less']
})
export class VillagerListComponent implements OnInit {
  @ViewChild(MatExpansionPanel) accordion!: MatExpansionPanel;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  public displayedVillagers$: Observable<Villager[]> = this.store.select(getDisplayVillagers);
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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(VillagerActions.LoadVillagers());
  }

  filterList() {
    this.accordion.close();
    this.store.dispatch(VillagerActions.SelectFilters({filterOptions: this.checkSelection}));
  }

  showFavorites(change: MatCheckboxChange) {
    this.accordion.close();
    this.store.dispatch(VillagerActions.ShowFavorites({toggle: change.checked}))
  }

  setSort(value: VillagerSortOptions) {
    this.store.dispatch(VillagerActions.SelectSort({selectedSortOption: value}));
  }

  checkboxChecked(change: MatCheckboxChange) {
    const checkedValue = change.source.value as VillagerSortOptions;
    this.checkSelection  = change.checked ? [...this.checkSelection, checkedValue] : this.checkSelection.filter(item => item !== checkedValue)
  }

  favoriteVillager(event: any, villagerToFav: Villager) {
    event.stopPropagation();
    this.store.dispatch(VillagerActions.FavoriteVillager({villager: villagerToFav}));
  }

  reset() {
    this.store.dispatch(VillagerActions.ResetSortFilter());
    this.checkSelection = [];
    this.checkboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        checkbox.toggle();
      }
    })
  }

}
