import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Villager, Personality, Species, Hobby, VillagerSortOptions, AcnhService} from '@animal-crossing/api';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'animal-crossing-villager-list',
  templateUrl: './villager-list.component.html',
  styleUrls: ['./villager-list.component.less']
})
export class VillagerListComponent implements OnInit {
  @ViewChild(MatExpansionPanel) accordion!: MatExpansionPanel;
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;

  private villagers: Villager[] = [];
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

  constructor(private apiService: AcnhService) { }

  ngOnInit(): void {
    this.apiService.getVillagers().subscribe((villagers: Villager[]) => {
      this.displayedVillagers = this.villagers = villagers;
    });
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
    const filters = this.checkSelection;
    this.displayedVillagers = this.villagers.filter((villager: Villager) => {
      const villagerVals = Object.values(villager);
      const villagerHasTrait = villagerVals.some(r=> filters.includes(r));
      return villagerHasTrait;
    })
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
    this.sortList(this.villagers, value);
  }

  checkboxChecked(change: MatCheckboxChange) {
    const checkedValue = change.source.value as VillagerSortOptions;
    this.checkSelection  = change.checked ? [...this.checkSelection, checkedValue] : this.checkSelection.filter(item => item !== checkedValue)
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
