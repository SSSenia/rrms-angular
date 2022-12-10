import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-page',
  templateUrl: './current-page.component.html',
  styleUrls: ['./current-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentPageComponent implements OnInit {

  public time$!: Observable<Date>;

  constructor() { }
  
  ngOnInit(): void {
    this.time$ = new Observable((subscriber)=>{
      (function run() {
        subscriber.next(new Date())
        setTimeout(run, 1000);
      })();
    })
  }
}