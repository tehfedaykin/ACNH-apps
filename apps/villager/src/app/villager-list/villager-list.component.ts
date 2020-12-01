import { getDisplayVillagers } from './../+state/selectors';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Villager, Personality, Species, Hobby, VillagerSortOptions, AcnhService } from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
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

  private villagers: Villager[] = [];
  //public displayedVillagers: Villager[] = [];
  public displayedVillagers$: Observable<Villager[]> = this.store.select(getDisplayVillagers);
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

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(VillagerActions.LoadVillagers());
  }

  sortList(list: Villager[], property: VillagerSortOptions) {
    if(property === "birthday") {
      list.sort(function(a,b){
        var [dayA, monthA] = a.birthday.split('/');
        var dateA = new Date(2020, parseInt(monthA, 10), parseInt(dayA, 10));

        var [dayB, monthB] = b.birthday.split('/');
        var dateB = new Date(2020, parseInt(monthB, 10), parseInt(dayB, 10));

        return dateA.getTime() - dateB.getTime()
      });
    }
    else {
      return list.sort(function(a, b) {
        var nameA = a[property].toUpperCase();
        var nameB = b[property].toUpperCase();
  
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }    
        return 0;
      });
    }

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
