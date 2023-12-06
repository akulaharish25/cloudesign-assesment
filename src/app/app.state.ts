export interface AppState {
    items: Item[];
  }
  
  export interface Item {
    id: number;
    name: string;
    mobileNumber: string;
    state: string;
    city: string;
  }
  