import { Injectable } from '@angular/core';
import produce from "immer";

const baseState = {
  villagers: [],
  selectedSortOption: undefined,
  filterOptions: [],
  showOnlyFavorites: false
}


@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  update(action: any, payload: any) {
    return produce(baseState, draftState => {
      draftState.push({todo: "Tweet about it"})
      draftState[1].done = true
  })
  }
}
