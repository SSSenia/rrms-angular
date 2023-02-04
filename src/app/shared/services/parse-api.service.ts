import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IArrayData, IChartValue, IChartValues, ICurrentValues, IApiValues, IApiValue, IProbabilityApi, ICorrelationApi } from '../interfaces';

const IS_MOCK: boolean = true;
const API_PATH: string = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class ParseApiService {

  constructor(
    private http: HttpClient
  ) { }

  private mockLastValues: IChartValue[] = [];
  private mockProbability: IProbabilityApi = {
    temperature: {
      value: [21, 28, 31, 29, 27],
      amount: [21, 28, 31, 29, 27]
    },
    pressure: {
      value: [21, 28, 31, 29, 27],
      amount: [21, 28, 31, 29, 27]
    },
    humidity: {
      value: [21, 28, 31, 29, 27],
      amount: [21, 28, 31, 29, 27]
    }
  }
  private mockCorrelation: ICorrelationApi = {
    data: {
      temperature: [29, 41, 32, 33, 34, 31, 12, 21, 21],
      humidity: [40, 51, 90, 70, 42, 34, 53, 32, 90],
      pressure: [1002, 1002, 1002, 1002, 1002, 1002, 1002, 1002, 1002],
    },
    coefCorrelation: {
      temperaturePressure: 0.41,
      temperatureHumidity: 0.32,
      pressureHumidity: -0.52
    }
  }

  private getMockLastValues(amount: number): Observable<IChartValues> {
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

  private getMockCurrent(): Observable<ICurrentValues> {
    const value = Math.round(24 + (Math.random() - 0.5) * 5);
    return of({
      temperature: value,
      pressure: value,
      humidity: value
    });
  }

  public getCurrent(): Observable<ICurrentValues> {
    if (IS_MOCK) return this.getMockCurrent();
    return this.http.get<ICurrentValues>(API_PATH + '/current');
  }

  public getLastValues(amount: number): Observable<IChartValues> {
    if (IS_MOCK) return this.getMockLastValues(amount);
    const reduceFunc = (prev: IArrayData, current: IApiValue) => {
      prev.temperature.push({ value: [current.date, current.temperature] });
      prev.pressure.push({ value: [current.date, current.pressure] });
      prev.humidity.push({ value: [current.date, current.humidity] });
      return prev;
    };
    return this.http.get<IApiValues>(API_PATH + '/last-values', {
      headers: { amount: String(amount) }
    }).pipe(
      map((statisticValues: IApiValues) => ({
        realData: {
          ...statisticValues.realData.reduce(reduceFunc, {
            temperature: [],
            pressure: [],
            humidity: []
          })
        },
        prognosisData: {
          ...statisticValues.prognosisData.reduce(reduceFunc, {
            temperature: [],
            pressure: [],
            humidity: []
          })
        }
      }))
    );
  }

  public getProbability(amount: number): Observable<IProbabilityApi> {
    if (IS_MOCK) return of(this.mockProbability);
    return this.http.get<IProbabilityApi>(`${API_PATH}/probability/?amount=${amount}`);
  }

  public getCorrelation(amount: number): Observable<ICorrelationApi> {
    if (IS_MOCK) return of(this.mockCorrelation);
    return this.http.get<ICorrelationApi>(`${API_PATH}/correlation/?amount=${amount}`);
  }
}
