// @ts-nocheck

import { Injectable } from '@angular/core';
import { Villager, VillagerSortOptions } from '@animal-crossing/api';

export interface VillagerState {
  villagers: Villager[],
  selectedSortOption: VillagerSortOptions | undefined,
  filterOptions: VillagerSortOptions[],
  showOnlyFavorites: boolean
}

export interface Action<payloadType> {
  type: string;
  payload?: payloadType;
}

const initialState: VillagerState {

}


@Injectable({
  providedIn: 'root'
})
export class ReduxService {
  private state = {

  }

  constructor() { }

  createStore(reducer, initialState) {
    let state = initialState;
    function getState() {
      return state;
    }
  
    function dispatch(action: Action) {
      state = reducer(state, action);
    }
  
    return { getState, dispatch };
  }

  getState() {
    return this.state;
  }

  reducer(state, action) {
    switch (action.type) {
      case 'SET_USER_NAME':
        return {
          ...state,
          name: action.payload,
        };
      case 'SET_DISPLAY_MODE':
        return {
          ...state,
          displayMode: action.payload,
        };
      default:
        return state;
    }
  }
}


// The createStore function we already wrote
function createStore(reducer, initialState) {
  let state = initialState;
  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
  }

  return { getState, dispatch };
}

// The reducer we already wrote
function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_DISPLAY_MODE':
      return {
        ...state,
        displayMode: action.payload,
      };
    default:
      return state;
  }
}

// Create a new store! This will take our reducer
// and also an initial version of our state.
const initialState = { name: 'Guest', displayMode: 'light' };
const store = createStore(reducer, initialState);

// Change our user's name to "Frankie"
store.dispatch({
  type: 'SET_USER_NAME',
  payload: 'Frankie',
});

console.log(store.getState());
//{ name: "Frankie", displayMode: "light" }

// Change our display mode to "dark"
store.dispatch({
  type: 'SET_DISPLAY_MODE',
  payload: 'dark',
});

console.log(store.getState());
//{ name: "Frankie", displayMode: "dark" }