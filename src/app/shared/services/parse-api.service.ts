import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IChartValue, ICurrentValues, IStatisticValues } from '../interfaces';

const IS_MOCK: boolean = true;
const API_PATH: string = '/api';

@Injectable({
  providedIn: 'root'
})
export class ParseApiService {

  constructor(
    private http: HttpClient
  ) { }

  mockLastValues: IChartValue[] = [];

  getMockLastValues(amount: number): Observable<IStatisticValues> {
    const value = 24 + (Math.random() - 0.5) * 5;
    this.mockLastValues.push({ value: [new Date, value] });
    const mockData = this.mockLastValues.slice(-amount);
    return of({
      realData: {
        temperature: mockData,
        pressure: mockData,
        humidity: mockData
      },
      prognosisData: {
        temperature: [],
        pressure: [],
        humidity: []
      }
    });
  }

  getMockCurrent(): Observable<ICurrentValues> {
    const value = Math.round(24 + (Math.random() - 0.5) * 5);
    return of({
      temperature: value,
      pressure: value,
      humidity: value
    });
  }

  getCurrent(): Observable<ICurrentValues> {
    if (IS_MOCK) return this.getMockCurrent();
    return this.http.get<ICurrentValues>(API_PATH + '/current');
  }

  getLastValues(amount: number): Observable<IStatisticValues> {
    if (IS_MOCK) return this.getMockLastValues(amount);
    return this.http.get<IStatisticValues>(API_PATH + '/last-values', {
      headers: { amount: String(amount) }
    });
  }
}
