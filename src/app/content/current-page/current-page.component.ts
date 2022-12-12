import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICurrentValues } from 'src/app/shared/interfaces';
import { ParseApiService } from 'src/app/shared/services/parse-api.service';

@Component({
  selector: 'app-current-page',
  templateUrl: './current-page.component.html',
  styleUrls: ['./current-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentPageComponent implements OnInit {

  public time$!: Observable<Date>;
  public currentValues$!: Observable<ICurrentValues>;

  constructor(
    private parseApiService: ParseApiService
  ) { }

  ngOnInit(): void {
    this.time$ = new Observable((subscriber) => {
      (function run() {
        subscriber.next(new Date())
        setTimeout(run, 1000);
      })();
    });

    this.currentValues$ = this.parseApiService.getCurrent();
  }
}