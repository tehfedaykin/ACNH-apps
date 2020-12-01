import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VillagerQuery } from './../+state/state/villager.query';
import { VillagerStore } from './../+state/state/villager.store';
import { VillagerService } from './../+state/state/villager.service';
import { Villager, Personality, Species, Hobby, VillagerSortOptions } from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatExpansionPanel} from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'animal-crossing-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.less']
})
export class VillagerListComponent implements OnInit {
  @ViewChild(MatExpansionPanel) accordion!: MatExpansionPanel;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  public displayedVillagers$: Observable<Villager[]> = this.villagerQuery.displayVillagers$;
  private checkSelection: VillagerSortOptions[] = [];
  public sortOptions = ["personality", "species", "hobby", "birthday"];
  public personalities = Object.values(Personality);
  public species = Object.values(Species);
  public hobbies = Object.values(Hobby);
  public checkBoxList = [
    {
      attribute: 'personality',
      list: this.personalities
    },
    {
      attribute: 'species',
      list: this.species
    },
    {
      attribute: 'hobby',
      list: this.hobbies
    }
  ]

  constructor(
    private villagerService: VillagerService, 
    private villagerQuery: VillagerQuery,
    private villagerStore: VillagerStore
  ) { }

  ngOnInit(): void {
    this.villagerService.getVillagers().pipe(take(1)).subscribe();
  }

  filterList() {
    this.accordion.close();
    this.villagerStore.update({filterOptions: this.checkSelection})
  }

  showFavorites(change: MatCheckboxChange) {
    this.accordion.close();
    this.villagerStore.update({showOnlyFavorites: change.checked})
  }

  setSort(value: VillagerSortOptions) {
    this.villagerStore.update({selectedSortOption: value})
  }

  checkboxChecked(change: MatCheckboxChange) {
    const checkedValue = change.source.value as VillagerSortOptions;
    this.checkSelection  = change.checked ? [...this.checkSelection, checkedValue] : this.checkSelection.filter(item => item !== checkedValue)
  }

  favoriteVillager(event: any, villagerToFav: Villager) {
    event.stopPropagation();
    this.villagerStore.update((state) => {
      return {
        ...state, 
        villagers: state.villagers.map((vil) => {
          return {
            ...vil,
            favorite: vil.id === villagerToFav.id ? !vil.favorite : vil.favorite
          }
        })
      }
    })
  }

  reset() {
    this.villagerStore.update({selectedSortOption: undefined, filterOptions: []});
    this.checkSelection = [];
    this.checkboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        checkbox.toggle();
      }
    })
  }

}
