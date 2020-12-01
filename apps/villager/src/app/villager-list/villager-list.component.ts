import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AcnhService } from './../../../../../libs/api/src/lib/acnh.service';
import { Villager, Personality, Species, Hobby, VillagerSortOptions } from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import { map, startWith, tap } from 'rxjs/operators';


@Component({
  selector: 'animal-crossing-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.less']
})
export class VillagerListComponent implements OnInit {
  @ViewChild(MatExpansionPanel) accordion!: MatExpansionPanel;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  private villagers: Villager[] = [];
  public displayedVillagers$! : Observable<Villager[]>;
  public displayedVillagers: Villager[] = [];
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

  private selectedSortOption = new BehaviorSubject<VillagerSortOptions | undefined>(undefined);
  private filterOptions = new BehaviorSubject<VillagerSortOptions[]>([]);

  constructor(private apiService: AcnhService) { }

  ngOnInit(): void {

    const villagers$ = this.apiService.getVillagers();
    this.displayedVillagers$ = combineLatest([villagers$, this.selectedSortOption, this.filterOptions]).pipe(
      map(([villagers, sortOption, filterOptions]) => {
        const villagerList = filterOptions.length ?  villagers.filter((villager: Villager) => {
          const villagerVals = Object.values(villager);
          const villagerHasTrait = villagerVals.some(r=> filterOptions.includes(r));
          return villagerHasTrait;
        }) : villagers;

        if(sortOption) {
          return this.sortList(villagerList, sortOption);
        }
        else {
          return villagerList
        }
      }),
      tap((val) => console.log({val})),
    );
  }

  sortList(list: Villager[], property: VillagerSortOptions): Villager[] {
    if(property === "birthday") {
      return list.sort(function(a,b){
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
    this.filterOptions.next(this.checkSelection);
  }

  showFavorites(change: MatCheckboxChange) {
    this.accordion.close();
    if(change.checked) {
      this.displayedVillagers = this.villagers.filter(villager => villager.favorite);
    }
    else {
      this.filterList();
    }
  }

  setSort(value: VillagerSortOptions) {
    this.selectedSortOption.next(value);
  }

  checkboxChecked(change: MatCheckboxChange) {
    const checkedValue = change.source.value as VillagerSortOptions;
    if(change.checked) {
      this.checkSelection.push(checkedValue)
    }
    else {
      this.checkSelection = this.checkSelection.filter(item => item !== checkedValue)
    }
  }

  favoriteVillager(event: any, villagerToFav: Villager) {
    event.stopPropagation();
    this.villagers = this.villagers.map((villager) => {
      if(villager.id === villagerToFav.id) {
        villager.favorite = !villager.favorite;
      }
      return villager;
    });
  }

  reset() {
    this.displayedVillagers = this.villagers;
    this.checkSelection = [];
    this.checkboxes.forEach((checkbox) => {
      if(checkbox.checked) {
        checkbox.toggle();
      }
    })
  }

}
