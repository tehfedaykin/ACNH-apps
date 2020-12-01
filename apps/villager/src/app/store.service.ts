import { Villager } from '@animal-crossing/api';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Action {
  type: string;
  payload: any;
}

export interface VillagerState {
  villagers: Villager[],
  displayedVillagers: Villager[],
}

@Injectable({
  providedIn: 'root'
})
export class StoreService<State> {
  private _state$: BehaviorSubject<State>;
  public state$: Observable<State>;
  
  constructor (initialState: State) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable() as Observable<State>;
  }

  get state(): State {
    return this._state$.getValue();
  }

  public setState(nextState: State): void {
    this._state$.next(nextState);
  }

  public reducer(action: Action) {
    const state = this.state;

    switch (action.type) {
      case 'GET_VILLAGERS':
        return {
          ...state,
          villagers: action.payload,
        };
      case 'FILTER_VILLAGERS':
        return {
          ...state,
          displayedVillagers: action.payload,
        };
      case 'FAVORITE_VILLAGER':
        return {
          ...state,
          villagers: action.payload
        }
      default:
        return state;
    }
  }
  
}
