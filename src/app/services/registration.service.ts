import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() {}

   getStates() {
    return of(['Karnataka', 'Maharashtra'])
   }

   getCities(state: string) {
    const cityMap: {[key: string]: string[]} = {
      Karnataka: ['Mangaluru', 'Bengaluru', 'Kolar'],
      Maharashtra: ['Pune', 'Mumbai', 'Thane']
    };
    const cities = cityMap[state] || [];
    return of(cities);
   }

   saveDetails(data: any[]) {
    localStorage.setItem('registredDetails', JSON.stringify({ dataArray: data}));
   }

   getData(): any[] {
    const storedData = localStorage.getItem('registredDetails');
    return storedData ? JSON.parse(storedData).dataArray : [];
   }

}
