export interface Name {
    'name-USen': string;
    'name-EUen': string;
    'name-EUde': string;
    'name-EUes': string;
    'name-USes': string;
    'name-EUfr': string;
    'name-USfr': string;
    'name-EUit': string;
    'name-EUnl': string;
    'name-CNzh': string;
    'name-TWzh': string;
    'name-JPja': string;
    'name-KRko': string;
    'name-EUru': string;
  }
  
  export interface Villager {
    id: number;
    fileName: string;
    name: Name;
    personality: Personality;
    birthdayString: string;
    birthday: string;
    species: Species;
    hobby: Hobby;
    gender: string;
    catchPhrase: string;
    iconUri: string;
    imageUri: string;
    bubbleColor: string;
    textColor: string;
    favorite?: boolean;
  }

  export enum Species {
    Alligator = 'Alligator',
    Anteater = 'Anteater',
    Bear = 'Bear',
    Bird = 'Bird',
    Bull = 'Bull',
    Cat = 'Cat',
    Cub = 'Cub',
    Chicken = 'Chicken',
    Cow = 'Cow',
    Deer = 'Deer',
    Dog = 'Dog',
    Duck = 'Duck',
    Eagle = 'Eagle',
    Elephant = 'Elephant',
    Frog = 'Frog',
    Goat = 'Goat',
    Gorilla = 'Gorilla',
    Hamster = 'Hamster',
    Hippo = 'Hippo',
    Horse = 'Horse',
    Koala = 'Koala',
    Kangaroo = 'Kangaroo',
    Lion = 'Lion',
    Monkey = 'Monkey',
    Mouse = 'Mouse',
    Octopus = 'Octopus',
    Ostrich = 'Ostrich',
    Penguin = 'Penguin',
    Pig = 'Pig',
    Rabbit = 'Rabbit',
    Rhino = 'Rhino',
    Sheep = 'Sheep',
    Squirrel = 'Squirrel',
    Tiger = 'Tiger',
    Wolf = 'Wolf'
  }

  export enum Hobby {
    Education = 'Education',
    Fitness = 'Fitness',
    Fashion = 'Fashion',
    Nature = 'Nature',
    Play = 'Play',
    Music = 'Music'
  }

  export enum Personality {
    Cranky = 'Cranky',
    Jock = 'Jock',
    Lazy = 'Lazy',
    Normal = 'Normal',
    Peppy = 'Peppy',
    Smug = 'Smug',
    Snooty = 'Snooty',
    Uchi = 'Uchi',
  }

  export type VillagerSortOptions = keyof Pick<Villager, "personality" | "species" | "hobby" | "birthday">;
  
  export enum Locations {
    River = 'River',
    Pond = 'Pond',
    Sea = 'Sea'
  }
  
  export enum Rarity {
  
  }
  
  export interface Availability {
    'month-northern': string;
    'month-southern': string;
    'time': string;
    'isAllDay': boolean;
    'isAllYear': boolean;
    'location': string;
    'rarity': string;
    'month-array-northern': [number],
    'month-array-southern': [number],
    'time-array': [number]
  }
  
  
  
  export interface Month {
    month: string;
    available: boolean;
  }
  
  interface Schedule {
    northern: Month[],
    southern: Month[]
  }
  
  export interface Creature {
    id: number;
    fileName: string;
    name: Name;
    availability: Availability;
    price: string;
    catchPhrase: string;
    museumPhrase: string;
    uiSchedule: Schedule;
  }
  
  export interface Fish extends Creature {
    priceCj: string;
    shadow: string;
  }
  
  export interface Insect extends Creature {
    priceFlick: string;
  }
  
  export interface Fossil {
    fileName: string;
    name: Name;
    price: number;
    museumPhrase: string;
    imageUri: string;
  }