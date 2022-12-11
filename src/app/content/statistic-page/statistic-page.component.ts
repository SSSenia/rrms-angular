import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

const MIN_VALUE: number = 5;
const MAX_VALUE: number = 1000;

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

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subToValue.unsubscribe();
  }
}
