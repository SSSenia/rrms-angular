import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval, map, Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { IChartValue, IPackageEChartOption } from 'src/app/shared/interfaces';
import { CHART_SETUP, CHART_THEME, MAX_VALUE, MIN_VALUE } from 'src/app/shared/setup-chart';

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageComponent implements OnInit, OnDestroy {

  public minValue: number = MIN_VALUE;
  public maxValue: number = MAX_VALUE;

  public valueControl: FormControl<number | null> = new FormControl<number>(MIN_VALUE);
  public value$: BehaviorSubject<number> = new BehaviorSubject<number>(MIN_VALUE);

  public subToValue: Subscription = this.valueControl.valueChanges.subscribe(
    (newValue: number | null) => {
      if (!(newValue && +newValue && newValue >= MIN_VALUE)) this.valueControl.setValue(MIN_VALUE);
      else if (newValue > MAX_VALUE) this.valueControl.setValue(MAX_VALUE);
      else this.value$.next(newValue)
    }
  );

  public chartTheme = CHART_THEME;
  public options: any = undefined;
  public updateOptions: Observable<IPackageEChartOption> | null = null;

  constructor() { }

  mockData: IChartValue[] = [];
  getMockData = (): IPackageEChartOption => {
    const value = 24 + (Math.random() - 0.5) * 5;
    this.mockData.push({
      value: [new Date, value]
    })
    const mockData = this.mockData.slice(-this.value$.getValue());
    return {
      temperature: { series: [{ data: mockData }] },
      pressure: { series: [{ data: mockData }] },
      humidity: { series: [{ data: mockData }] }
    }
  }

  ngOnInit(): void {
    this.updateOptions = interval(1000).pipe(map(this.getMockData));
    this.options = CHART_SETUP;
  }

  ngOnDestroy() {
    this.subToValue.unsubscribe();
  }
}