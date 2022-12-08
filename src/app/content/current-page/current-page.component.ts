import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-page',
  templateUrl: './current-page.component.html',
  styleUrls: ['./current-page.component.scss']
})
export class CurrentPageComponent implements OnInit {

  public time$!: Observable<Date>;

  constructor() { }
  
  ngOnInit(): void {
    this.time$ = new Observable((subscriber)=>{
      setInterval(()=>{
        subscriber.next(new Date())
      }, 500)
    })
  }
}