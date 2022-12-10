import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';

const MIN_VALUE: number = 5;
const MAX_VALUE: number = 1000;

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticPageComponent implements OnInit, AfterViewInit {

  public minValue: number = MIN_VALUE;
  public maxValue: number = MAX_VALUE;

  public valueControl: FormControl<number | null> = new FormControl<number>(MIN_VALUE);

  public value$!: Observable<number | null>;

  constructor() { }

  ngOnInit(): void {
    this.value$ = this.valueControl.valueChanges.pipe(
      map((newValue: number | null)=> {
        if(!(newValue && +newValue)){;
          this.valueControl.setValue(MIN_VALUE);
          return MIN_VALUE;
        } else if(newValue < MIN_VALUE) {
          this.valueControl.setValue(MIN_VALUE);
          return MIN_VALUE;
        } else if(newValue > MAX_VALUE){
          this.valueControl.setValue(MAX_VALUE);
          return MAX_VALUE;
        } else {
          return newValue;
        }
      })
    );
  }
  
  ngAfterViewInit(): void {
    this.valueControl.setValue(MIN_VALUE);
  }
}
